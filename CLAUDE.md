# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A Plotly Dash component library published to PyPI as `dash-dropdown-components`. It exposes two React components (`Dropdown` and `MultiLevelDropdown`) to Python, R, and Julia via Dash's component-generation toolchain.

## Build commands

```bash
# Install JS dependencies
npm install

# Install Python dev dependencies (activate venv first)
pip install -r requirements.txt

# Build JS bundle only
npm run build:js

# Generate Python/R/Julia bindings from React component propTypes
npm run build:backends-activated   # activates venv automatically

# Full build (JS + all backends)
npm run build:activated

# Run demo app in browser (hot reload)
npm start

# Run usage.py demo manually
python usage.py
```

## Running tests

```bash
# Integration tests require a running browser (selenium via dash.testing)
pytest tests/test_usage.py
```

## Architecture

### Two-layer structure

Each component lives in two places that must stay in sync:

1. **React source** — `src/lib/components/*.react.js` — the actual implementation
2. **Auto-generated Python/R/Julia stubs** — `dash_dropdown_components/*.py`, `R/*.R`, `src/jl/*.jl` — produced by `npm run build:backends` from the React PropTypes; **do not edit these by hand**

The built JS bundle (`dash_dropdown_components/dash_dropdown_components.min.js`) is committed and served directly by Dash at runtime.

### Component details

- **`Dropdown`** (`Dropdown.react.js`) — wraps `react-select`. A class component that intercepts `multi` prop changes via `componentDidUpdate` to coerce the value between scalar/array form without requiring a callback.
- **`MultiLevelDropdown`** (`MultiLevelDropdown.react.js`) — wraps `react-select` with a recursive `MultiLevelOption` component that renders nested submenus via CSS hover. Options use a path-as-value scheme (value is an array of ancestor values + own value), handled by `sanitizemultilevel.js`.

### Utility modules (`src/lib/utils/`)

- `sanitize.js` — normalises flat option shapes (string shorthand → `{label, value}`)
- `sanitizemultilevel.js` — `flattenOptions`/`nestOptions` to convert between the tree structure and the flat list `react-select` needs; `sanitizeValueMultiLevel` converts path arrays ↔ display strings
- `helpers.js` — shared `react-select` component overrides (`IndicatorSeparator`, `DropdownIndicator`) and `colorStyles`
- `sort.js` — option sorting utilities

### Build / publish flow

1. Edit React source in `src/lib/components/`
2. `npm run build` to produce new JS bundle and regenerate Python/R/Julia stubs
3. Bump version in `package.json` (propagates to `package-info.json` and Python `__version__` via `setup.py`)
4. Push; the `deploy` GitHub Actions workflow (manual trigger) builds and uploads to PyPI via `twine`

## Key conventions

- Component PropTypes in the React files are the source of truth for the Python API — add/rename props there and re-run `build:backends`
- The `venv/` directory (Python 3.12) is used for development; `.venv/` (Python 3.9) also exists but is older
- CSS lives in `src/lib/styles.css` and is bundled into the JS via `style-loader`; class names are prefixed `ddc-`
