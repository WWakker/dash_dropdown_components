# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Dropdown(Component):
    """A Dropdown component.


Keyword arguments:

- id (string; optional)

- className (string; optional)

- clearable (boolean; default True)

- disabled (boolean; default False)

- multi (boolean; default False)

- options (list of dicts; required)

    `options` is a list of dicts with keys:

    - value (string | number; required)

    - label (string; optional)

- placeholder (string; default 'Select...')

- searchable (boolean; default True)

- style (dict; optional)

- value (list of dicts; optional)

    `value` is a list of dicts with keys:

    - value (string

      Or number; required)

    - label (string; optional) | dict with keys:

    - value (string | number; required)

    - label (string; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_dropdown_components'
    _type = 'Dropdown'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, options=Component.REQUIRED, value=Component.UNDEFINED, multi=Component.UNDEFINED, placeholder=Component.UNDEFINED, disabled=Component.UNDEFINED, searchable=Component.UNDEFINED, clearable=Component.UNDEFINED, style=Component.UNDEFINED, className=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'clearable', 'disabled', 'multi', 'options', 'placeholder', 'searchable', 'style', 'value']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'clearable', 'disabled', 'multi', 'options', 'placeholder', 'searchable', 'style', 'value']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['options']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(Dropdown, self).__init__(**args)
