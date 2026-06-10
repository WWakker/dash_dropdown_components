# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Release dates are the PyPI publication dates.

## [Unreleased]

### Added
- CI workflow (`test.yml`) that builds the bundle on Linux and runs the selenium
  test suite headless on every push and pull request; deploys are now gated on it.
- Regression tests for dict-form options and for multi values missing from options.

### Fixed
- `Dropdown`: dict-form `options` (`{value: label, ...}`) did not render; entries
  were wrapped in an extra array that react-select cannot display.
- `MultiLevelDropdown`: a `value` entry that is missing from `options` (e.g. after a
  callback swaps options) crashed the component; such values are now dropped.
- Build failed on case-sensitive filesystems (Linux) due to an import casing
  mismatch (`Sanitize` vs `sanitize.js`).
- Backspace-to-clear now follows `clearable`: the underlying react-select prop was
  passed under its obsolete v1 name (`backspaceRemoves`) and silently ignored.
- README: corrected the `style` prop description in both props tables and the
  repository link.

### Changed
- Python packaging modernised: `pyproject.toml` added, releases built with
  `python -m build`; the package now declares `dash>=2.0.0` and requires
  Python ≥ 3.8.

### Removed
- Unimplemented per-option `title` and `search` fields from `Dropdown`'s documented
  props.
- Dead code and unused dependencies: `sort.js`, `@dnd-kit/*`, `chroma-js`,
  `react-sortable-hoc`, `styled-jsx`.

## [1.1.1] - 2026-06-09

### Fixed
- Menus render in a portal at `document.body` with a controlled z-index, so they
  paint above overlapping page content regardless of the ancestor stacking context.

## [1.1.0] - 2026-06-09 (not published to PyPI; included in 1.1.1)

### Added
- `MultiLevelDropdown`: `submenu_max_width` prop to cap submenu width (single CSS
  width or per-level list); long option labels wrap within the cap. Defaults to the
  width of the dropdown control.

## [1.0.1] - 2026-05-21

### Fixed
- Release tooling: updated the deploy workflow (no component changes).

## [1.0.0] - 2026-05-21

### Changed
- **Breaking**: `MultiLevelDropdown` nested options now use a recursive `options`
  key instead of `suboptions`.
- Major `MultiLevelDropdown` rework: submenus are mounted reliably (rendered via
  React portals), flip to the left when they would overflow the window, and reset
  their scroll position correctly.

### Added
- Selenium integration test suite (`tests/test_usage.py`).
- Nesting documented in the `options` docstring.

### Fixed
- Stale options after callbacks updated `options`, and a browser incompatibility.
- Scrollbar behaviour and scroll position of submenus.
- Removed the `dash-dropdown` CSS class that could clash with other components.

## [0.0.15] - 2025-05-08

### Added
- Documentation (README component/property reference).

## [0.0.14] - 2025-05-07

### Removed
- Drag-to-reorder of selected values in `Dropdown` multi mode.

## [0.0.13] - 2025-01-29

### Changed
- Minor styling.

## [0.0.12] - 2025-01-25

### Fixed
- Replaced the deprecated `componentWillReceiveProps` lifecycle method.

## [0.0.11] - 2025-01-24

### Fixed
- Alignment of values missing from `options`.

## [0.0.10] - 2025-01-24

### Fixed
- Improved null/empty value handling.

## [0.0.9] - 2025-01-24

### Fixed
- Multi-value chip labels wrap instead of overflowing.

## [0.0.8] - 2025-01-24

### Fixed
- Component state now follows external `value` prop changes (e.g. from callbacks).

## [0.0.7] - 2025-01-23

### Changed
- Removed extra margin and padding from the menu.

## [0.0.6] - 2025-01-18

### Changed
- Style updates.

## [0.0.5] - 2025-01-13

### Added
- `clearable` prop.

## [0.0.4] - 2025-01-06

### Added
- `MultiLevelDropdown`: `submenu_widths` prop for per-level submenu widths.

## [0.0.3] - 2025-01-06

### Changed
- Internal simplification and code reuse between the two components.

## [0.0.2] - 2025-01-06

### Added
- `MultiLevelDropdown` component with nested submenu options.
- `Dropdown` coerces `value` between scalar and list form when `multi` changes,
  without requiring a callback.

## [0.0.1] - 2024-12-22

### Added
- Initial release: `Dropdown` component wrapping react-select — multi-select whose
  menu stays open on selection, styled multi-value chips with drag-to-reorder, and
  a `value` API aligned with `dcc.Dropdown`.
