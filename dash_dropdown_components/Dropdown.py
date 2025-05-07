# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Dropdown(Component):
    """A Dropdown component.
A dropdown similar to dcc.Dropdown, where the menu stays open when multi=true and a selection is made

Keyword arguments:

- id (string; optional):
    The ID of this component, used to identify dash components in
    callbacks. The ID needs to be unique across all of the components
    in an app.

- className (string; optional):
    className of the dropdown element.

- clearable (boolean; optional):
    Whether or not the dropdown is \"clearable\", that is, whether or
    not a small \"x\" appears on the right of the dropdown that
    removes the selected value.

- disabled (boolean; default False):
    If True, this dropdown is disabled and the selection cannot be
    changed.

- hide_options_on_select (boolean; default True):
    If True, options are removed when selected.

- multi (boolean; default False):
    If True, the user can select multiple values.

- options (list of dicts; optional):
    An array of options {label: [string|number], value:
    [string|number]},.

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

- placeholder (string; default 'Select...'):
    A placeholder in the dropdown input if no selection is made yet;
    default is 'Select...'.

- searchable (boolean; default True):
    Whether to enable the searching feature or not.

- style (dict; optional):
    Defines CSS styles which will override styles previously set.

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
    def __init__(self, id=Component.UNDEFINED, options=Component.UNDEFINED, value=Component.UNDEFINED, multi=Component.UNDEFINED, clearable=Component.UNDEFINED, placeholder=Component.UNDEFINED, disabled=Component.UNDEFINED, hide_options_on_select=Component.UNDEFINED, searchable=Component.UNDEFINED, style=Component.UNDEFINED, className=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'clearable', 'disabled', 'hide_options_on_select', 'multi', 'options', 'placeholder', 'searchable', 'style', 'value']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'clearable', 'disabled', 'hide_options_on_select', 'multi', 'options', 'placeholder', 'searchable', 'style', 'value']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(Dropdown, self).__init__(**args)
