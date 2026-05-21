"""Selenium integration tests for the components in usage.py.

To run:
    pip install -r tests/requirements.txt
    pytest tests/test_usage.py
"""

from dash.testing.application_runners import import_app
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def _ml_option(driver, label):
    return driver.find_element(
        By.XPATH,
        f"//div[contains(@class, 'ddc-ml-option')][.//span[normalize-space(text())='{label}']]",
    )


def _wait_ml_option(driver, label, timeout=5):
    return WebDriverWait(driver, timeout).until(
        EC.visibility_of_element_located((
            By.XPATH,
            f"//div[contains(@class, 'ddc-ml-option')][.//span[normalize-space(text())='{label}']]",
        ))
    )


def test_renders_without_errors(dash_duo):
    app = import_app('usage')
    dash_duo.start_server(app)

    assert dash_duo.find_element('#ddc-dd') is not None
    assert dash_duo.find_element('#ddc-mldd') is not None

    severe = [entry for entry in dash_duo.get_logs() or [] if entry.get('level') == 'SEVERE']
    assert not severe, f'Unexpected browser console errors: {severe}'


def test_dropdown_selects_value(dash_duo):
    app = import_app('usage')
    dash_duo.start_server(app)

    dash_duo.wait_for_text_to_equal('#ddc-dd-selection', 'You have entered banana')

    dash_duo.find_element('#ddc-dd .ddc-dropdown__control').click()
    apple = WebDriverWait(dash_duo.driver, 5).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//div[contains(@class, 'ddc-dropdown__option')][normalize-space(text())='Apple']",
        ))
    )
    apple.click()

    dash_duo.wait_for_text_to_equal('#ddc-dd-selection', 'You have entered apple')


def test_multileveldropdown_deep_selection(dash_duo):
    """Regression guard: hovering a parent renders its submenu as a portal at
    document.body, hovering a nested parent renders the next portal, and
    clicking a leaf flows the full path back via setProps."""
    app = import_app('usage')
    dash_duo.start_server(app)

    dash_duo.find_element('#ddc-mldd .ddc-ml-dropdown__control').click()

    fruits = _wait_ml_option(dash_duo.driver, 'Fruits')
    ActionChains(dash_duo.driver).move_to_element(fruits).perform()

    WebDriverWait(dash_duo.driver, 5).until(
        lambda d: any(
            el.is_displayed()
            for el in d.find_elements(By.CSS_SELECTOR, 'body > .ddc-ml-submenu')
        )
    )

    berries = _wait_ml_option(dash_duo.driver, 'Berries')
    ActionChains(dash_duo.driver).move_to_element(berries).perform()

    strawberry = _wait_ml_option(dash_duo.driver, 'Strawberry')
    strawberry.click()

    dash_duo.wait_for_text_to_equal(
        '#ddc-mldd-selection',
        "You have entered ['fruits', 'berries', 'strawberry']",
    )


def test_multi_mode_keeps_menu_open(dash_duo):
    """In multi mode, closeMenuOnSelect is false: selecting a leaf must update
    the value without unmounting the parent dropdown menu."""
    app = import_app('usage')
    dash_duo.start_server(app)

    dash_duo.driver.find_element(
        By.XPATH,
        "//div[@id='ddc-mldd-multi']//label[contains(., 'Multi: True')]//input",
    ).click()

    dash_duo.find_element('#ddc-mldd .ddc-ml-dropdown__control').click()

    fruits = _wait_ml_option(dash_duo.driver, 'Fruits')
    ActionChains(dash_duo.driver).move_to_element(fruits).perform()

    apple = _wait_ml_option(dash_duo.driver, 'Apple')
    apple.click()

    dash_duo.wait_for_text_to_equal(
        '#ddc-mldd-selection',
        "You have entered [['fruits', 'banana'], ['fruits', 'apple']]",
    )
    assert dash_duo.find_element('#ddc-mldd .ddc-ml-dropdown__menu') is not None
