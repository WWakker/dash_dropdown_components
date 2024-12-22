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

- options (list of dicts; optional)

    `options` is a list of string | number | booleans | dict | list of
    dicts with keys:

    - label (a list of or a singular dash component, string or number; required):
        The option's label.

    - value (string | number | boolean; required):
        The value of the option. This value corresponds to the items
        specified in the `value` property.

    - disabled (boolean; optional):
        If True, this option is disabled and cannot be selected.

    - title (string; optional):
        The HTML 'title' attribute for the option. Allows for
        information on hover. For more information on this attribute,
        see
        https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title.

    - search (string; optional):
        Optional search value for the option, to use if the label is a
        component or provide a custom search value different from the
        label. If no search value and the label is a component, the
        `value` will be used for search.

- placeholder (string; default 'Select...')

- searchable (boolean; default True)

- style (dict; optional)

- value (string | number | boolean | list of string | number | booleans; optional):
    The value of the input. If `multi` is False (the default) then
    value is just a string that corresponds to the values provided in
    the `options` property. If `multi` is True, then multiple values
    can be selected at once, and `value` is an array of items with
    values corresponding to those in the `options` prop."""
    _children_props = ['options[].label']
    _base_nodes = ['children']
    _namespace = 'dash_dropdown_components'
    _type = 'Dropdown'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, options=Component.UNDEFINED, value=Component.UNDEFINED, multi=Component.UNDEFINED, placeholder=Component.UNDEFINED, disabled=Component.UNDEFINED, searchable=Component.UNDEFINED, clearable=Component.UNDEFINED, style=Component.UNDEFINED, className=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'clearable', 'disabled', 'multi', 'options', 'placeholder', 'searchable', 'style', 'value']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'clearable', 'disabled', 'multi', 'options', 'placeholder', 'searchable', 'style', 'value']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(Dropdown, self).__init__(**args)
