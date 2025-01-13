# AUTO GENERATED FILE - DO NOT EDIT

export multileveldropdown

"""
    multileveldropdown(;kwargs...)

A MultiLevelDropdown component.
A dropdown similar to dcc.Dropdown but with multiple levels, where the menu stays open when multi=true and a selection is made
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
- `options` (optional): An array of options {label: [string|number], value: [string|number]},. options has the following type: Array of lists containing elements 'value', 'label', 'options'.
Those elements have the following types:
  - `value` (String | Real | Bool; required)
  - `label` (String | Real | Bool; required)
  - `options` (optional): . options has the following type: Array of lists containing elements 'value', 'label'.
Those elements have the following types:
  - `value` (String | Real | Bool; required)
  - `label` (String | Real | Bool; required)ss
- `placeholder` (String; optional): A placeholder in the dropdown input if no selection is made yet; default is 'Select...'
- `style` (Dict; optional): Defines CSS styles which will override styles previously set.
- `submenu_widths` (Array; optional): If true, options are removed when selected.
- `value` (Array of Array of String | Real | Boolss | Array of String | Real | Bools; optional): The value of the input. If multi is false (the default)
then value is just a string that corresponds to the values
provided in the options property. If multi is true, then
multiple values can be selected at once, and value is an
array of items with values corresponding to those in the
options prop.
"""
function multileveldropdown(; kwargs...)
        available_props = Symbol[:id, :className, :clearable, :disabled, :hide_options_on_select, :multi, :options, :placeholder, :style, :submenu_widths, :value]
        wild_props = Symbol[]
        return Component("multileveldropdown", "MultiLevelDropdown", "dash_dropdown_components", available_props, wild_props; kwargs...)
end

