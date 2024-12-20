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
- `options` (required): . options has the following type: Array of lists containing elements 'value', 'label'.
Those elements have the following types:
  - `value` (String | Real; required)
  - `label` (String; optional)s
- `placeholder` (String; optional)
- `searchable` (Bool; optional)
- `style` (Dict; optional)
- `value` (optional): . value has the following type: Array of lists containing elements 'value', 'label'.
Those elements have the following types:
  - `value` (String | Real; required)
  - `label` (String; optional)s | lists containing elements 'value', 'label'.
Those elements have the following types:
  - `value` (String | Real; required)
  - `label` (String; optional)
"""
function dropdown(; kwargs...)
        available_props = Symbol[:id, :className, :clearable, :disabled, :multi, :options, :placeholder, :searchable, :style, :value]
        wild_props = Symbol[]
        return Component("dropdown", "Dropdown", "dash_dropdown_components", available_props, wild_props; kwargs...)
end

