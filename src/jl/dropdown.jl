# AUTO GENERATED FILE - DO NOT EDIT

export dropdown

"""
    dropdown(;kwargs...)

A Dropdown component.
A dropdown similar to dcc.Dropdown, where the menu stays open when multi=true and a selection is made
Keyword arguments:
- `id` (String; optional): The ID of this component, used to identify dash components
in callbacks. The ID needs to be unique across all of the
components in an app.
- `className` (String; optional): className of the dropdown element
- `clearable` (Bool; optional): Whether or not the dropdown is "clearable", that is, whether or
not a small "x" appears on the right of the dropdown that removes
the selected value.
- `disabled` (Bool; optional): If true, this dropdown is disabled and the selection cannot be changed.
- `hide_options_on_select` (Bool; optional): If true, options are removed when selected.
- `multi` (Bool; optional): If true, the user can select multiple values
- `options` (optional): An array of options {label: [string|number], value: [string|number]},. options has the following type: Array of String | Real | Bools | Dict | Array of lists containing elements 'label', 'value', 'disabled', 'title', 'search'.
Those elements have the following types:
  - `label` (a list of or a singular dash component, string or number; required): The option's label
  - `value` (String | Real | Bool; required): The value of the option. This value
corresponds to the items specified in the
`value` property.
  - `disabled` (Bool; optional): If true, this option is disabled and cannot be selected.
  - `title` (String; optional): The HTML 'title' attribute for the option. Allows for
information on hover. For more information on this attribute,
see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title
  - `search` (String; optional): Optional search value for the option, to use if the label
is a component or provide a custom search value different
from the label. If no search value and the label is a
component, the `value` will be used for search.s
- `placeholder` (String; optional): A placeholder in the dropdown input if no selection is made yet; default is 'Select...'
- `searchable` (Bool; optional): Whether to enable the searching feature or not
- `style` (Dict; optional): Defines CSS styles which will override styles previously set.
- `value` (String | Real | Bool | Array of String | Real | Bools; optional): The value of the input. If `multi` is false (the default)
then value is just a string that corresponds to the values
provided in the `options` property. If `multi` is true, then
multiple values can be selected at once, and `value` is an
array of items with values corresponding to those in the
`options` prop.
"""
function dropdown(; kwargs...)
        available_props = Symbol[:id, :className, :clearable, :disabled, :hide_options_on_select, :multi, :options, :placeholder, :searchable, :style, :value]
        wild_props = Symbol[]
        return Component("dropdown", "Dropdown", "dash_dropdown_components", available_props, wild_props; kwargs...)
end

