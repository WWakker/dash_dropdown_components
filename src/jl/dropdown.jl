# AUTO GENERATED FILE - DO NOT EDIT

export dropdown

"""
    dropdown(;kwargs...)

A Dropdown component.

Keyword arguments:
- `id` (String; optional)
- `className` (String; optional)
- `clearable` (Bool; optional)
- `disabled` (Bool; optional)
- `multi` (Bool; optional)
- `options` (optional): . options has the following type: Array of String | Real | Bools | Dict | Array of lists containing elements 'label', 'value', 'disabled', 'title', 'search'.
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
- `placeholder` (String; optional)
- `searchable` (Bool; optional)
- `style` (Dict; optional)
- `value` (String | Real | Bool | Array of String | Real | Bools; optional): The value of the input. If `multi` is false (the default)
then value is just a string that corresponds to the values
provided in the `options` property. If `multi` is true, then
multiple values can be selected at once, and `value` is an
array of items with values corresponding to those in the
`options` prop.
"""
function dropdown(; kwargs...)
        available_props = Symbol[:id, :className, :clearable, :disabled, :multi, :options, :placeholder, :searchable, :style, :value]
        wild_props = Symbol[]
        return Component("dropdown", "Dropdown", "dash_dropdown_components", available_props, wild_props; kwargs...)
end

