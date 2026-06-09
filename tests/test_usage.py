"""Selenium integration tests for the components in usage.py.

To run:
    pip install -r tests/requirements.txt
    pytest tests/test_usage.py
"""

import dash_dropdown_components as ddc
from dash import Dash, html
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
    # The menu renders in a body-level portal (menuPortalTarget), so it is no longer a
    # descendant of #ddc-mldd; locate it globally instead.
    assert dash_duo.find_element('.ddc-ml-dropdown__menu') is not None


_LONG_LABEL = (
    'A deliberately very long submenu label that must wrap onto multiple '
    'lines once the submenu width is capped'
)


def _submenu_width_app(submenu_max_width=None, control_width='240px'):
    """A minimal app with one parent whose submenu holds a short and a long
    label, used to exercise the submenu width cap + label wrapping."""
    app = Dash(__name__)
    kwargs = {} if submenu_max_width is None else {'submenu_max_width': submenu_max_width}
    app.layout = html.Div(
        ddc.MultiLevelDropdown(
            id='mldd',
            options=[{
                'label': 'Parent',
                'value': 'parent',
                'options': [
                    {'label': 'Short', 'value': 'short'},
                    {'label': _LONG_LABEL, 'value': 'long'},
                ],
            }],
            style={'width': control_width},
            **kwargs,
        ),
        # Wide outer container so an *uncapped* submenu would be free to stretch.
        style={'width': '900px'},
    )
    return app


def _open_parent_submenu(dash_duo):
    dash_duo.find_element('#mldd .ddc-ml-dropdown__control').click()
    parent = _wait_ml_option(dash_duo.driver, 'Parent')
    ActionChains(dash_duo.driver).move_to_element(parent).perform()
    return WebDriverWait(dash_duo.driver, 5).until(
        lambda d: next(
            (el for el in d.find_elements(By.CSS_SELECTOR, 'body > .ddc-ml-submenu')
             if el.is_displayed()),
            False,
        )
    )


def _option_height(submenu, label):
    for opt in submenu.find_elements(By.CSS_SELECTOR, '.ddc-ml-option'):
        text = opt.text.strip()
        if (label == 'Short' and text == 'Short') or (label == 'long' and text != 'Short'):
            return opt.size['height']
    raise AssertionError(f'option {label!r} not found in submenu')


def test_submenu_defaults_max_width_to_control(dash_duo):
    """Regression guard: with no submenu_max_width, a submenu is capped at the
    control's width (~240px) rather than stretching to the long label's natural
    width, and the long label wraps onto more than one line."""
    dash_duo.start_server(_submenu_width_app(control_width='240px'))
    submenu = _open_parent_submenu(dash_duo)

    assert submenu.size['width'] <= 260, submenu.size
    assert _option_height(submenu, 'long') > _option_height(submenu, 'Short')

    severe = [e for e in dash_duo.get_logs() or [] if e.get('level') == 'SEVERE']
    assert not severe, f'Unexpected browser console errors: {severe}'


def test_submenu_max_width_prop_caps_width(dash_duo):
    """submenu_max_width overrides the default cap with an explicit width."""
    dash_duo.start_server(_submenu_width_app(submenu_max_width='130px'))
    submenu = _open_parent_submenu(dash_duo)

    assert submenu.size['width'] <= 145, submenu.size
    assert _option_height(submenu, 'long') > _option_height(submenu, 'Short')


def _topmost_at_option_center(driver, option):
    """Return 'MENU' if the topmost painted element at the option's viewport centre
    belongs to the dropdown menu, else 'OTHER:<hint>'. Discriminates whether the menu
    is actually painting on top / unclipped at that point."""
    return driver.execute_script(
        """
        const opt = arguments[0];
        const r = opt.getBoundingClientRect();
        let cur = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        while (cur) {
          const c = (typeof cur.className === 'string') ? cur.className : '';
          if (c.indexOf('ddc-dropdown__option') !== -1 || c.indexOf('ddc-dropdown__menu') !== -1) {
            return 'MENU';
          }
          cur = cur.parentElement;
        }
        const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return 'OTHER:' + (el ? (el.id || (typeof el.className === 'string' ? el.className : el.tagName)) : 'null');
        """,
        option,
    )


def _wait_option(dash_duo, label):
    return WebDriverWait(dash_duo.driver, 5).until(
        EC.visibility_of_element_located((
            By.XPATH,
            f"//div[contains(@class, 'ddc-dropdown__option')][normalize-space(text())='{label}']",
        ))
    )


def test_menu_paints_above_higher_zindex_sibling(dash_duo):
    """The menu is portaled to body, so it paints above a sibling overlay with a higher
    z-index even when the dropdown sits in its own (lower) stacking context -- the case a
    plain z-index bump on the inline menu could not fix."""
    app = Dash(__name__)
    app.layout = html.Div([
        html.Div(
            ddc.Dropdown(id='dd', options=['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
                         value='Apple'),
            style={'position': 'relative', 'zIndex': 1, 'width': '300px'},
        ),
        html.Div('overlay', id='overlay', style={
            'position': 'fixed', 'top': '60px', 'left': '0',
            'width': '500px', 'height': '600px', 'zIndex': 1000,
            'background': 'rgba(255, 0, 0, 0.4)',
        }),
    ])
    dash_duo.start_server(app)

    dash_duo.find_element('#dd .ddc-dropdown__control').click()
    banana = _wait_option(dash_duo, 'Banana')  # centre sits under the overlay region
    assert _topmost_at_option_center(dash_duo.driver, banana) == 'MENU', \
        _topmost_at_option_center(dash_duo.driver, banana)


def test_menu_not_clipped_by_overflow_hidden(dash_duo):
    """The portaled menu escapes an ancestor overflow:hidden clip: an option below the
    clipping container still paints (would be invisible if rendered inline)."""
    app = Dash(__name__)
    app.layout = html.Div(
        ddc.Dropdown(id='dd', options=['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
                     value='Apple'),
        style={'overflow': 'hidden', 'height': '40px', 'width': '300px'},
    )
    dash_duo.start_server(app)

    dash_duo.find_element('#dd .ddc-dropdown__control').click()
    cherry = _wait_option(dash_duo, 'Cherry')  # well below the 40px clipping container
    assert _topmost_at_option_center(dash_duo.driver, cherry) == 'MENU', \
        _topmost_at_option_center(dash_duo.driver, cherry)
