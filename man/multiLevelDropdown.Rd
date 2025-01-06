% Auto-generated: do not edit by hand
\name{multiLevelDropdown}

\alias{multiLevelDropdown}

\title{MultiLevelDropdown component}

\description{
A dropdown similar to dcc.Dropdown but with multiple levels, where the menu stays open when multi=true and a selection is made
}

\usage{
multiLevelDropdown(id=NULL, className=NULL, disabled=NULL,
hide_options_on_select=NULL, multi=NULL, options=NULL,
placeholder=NULL, style=NULL, submenu_widths=NULL,
value=NULL)
}

\arguments{
\item{id}{Character. The ID of this component, used to identify dash components
in callbacks. The ID needs to be unique across all of the
components in an app.}

\item{className}{Character. className of the dropdown element}

\item{disabled}{Logical. If true, this dropdown is disabled and the selection cannot be changed.}

\item{hide_options_on_select}{Logical. If true, options are removed when selected.}

\item{multi}{Logical. If true, the user can select multiple values}

\item{options}{List of lists containing elements 'value', 'label', 'options'.
those elements have the following types:
  - value (character | numeric | logical; required)
  - label (character | numeric | logical; required)
  - options (optional): . options has the following type: list of lists containing elements 'value', 'label'.
those elements have the following types:
  - value (character | numeric | logical; required)
  - label (character | numeric | logical; required)ss. An array of options {label: [string|number], value: [string|number]},}

\item{placeholder}{Character. A placeholder in the dropdown input if no selection is made yet; default is 'Select...'}

\item{style}{Named list. Defines CSS styles which will override styles previously set.}

\item{submenu_widths}{Unnamed list. If true, options are removed when selected.}

\item{value}{List of list of character | numeric | logicalss | list of character | numeric | logicals. The value of the input. If multi is false (the default)
then value is just a string that corresponds to the values
provided in the options property. If multi is true, then
multiple values can be selected at once, and value is an
array of items with values corresponding to those in the
options prop.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

