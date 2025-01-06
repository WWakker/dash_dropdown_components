% Auto-generated: do not edit by hand
\name{dropdown}

\alias{dropdown}

\title{Dropdown component}

\description{
A dropdown similar to dcc.Dropdown, where the menu stays open when multi=true and a selection is made
}

\usage{
dropdown(id=NULL, className=NULL, disabled=NULL,
hide_options_on_select=NULL, multi=NULL, options=NULL,
placeholder=NULL, searchable=NULL, style=NULL, value=NULL)
}

\arguments{
\item{id}{Character. The ID of this component, used to identify dash components
in callbacks. The ID needs to be unique across all of the
components in an app.}

\item{className}{Character. className of the dropdown element}

\item{disabled}{Logical. If true, this dropdown is disabled and the selection cannot be changed.}

\item{hide_options_on_select}{Logical. If true, options are removed when selected.}

\item{multi}{Logical. If true, the user can select multiple values}

\item{options}{List of character | numeric | logicals | named list | list of lists containing elements 'label', 'value', 'disabled', 'title', 'search'.
those elements have the following types:
  - label (a list of or a singular dash component, string or number; required): the option's label
  - value (character | numeric | logical; required): the value of the option. this value
corresponds to the items specified in the
`value` property.
  - disabled (logical; optional): if true, this option is disabled and cannot be selected.
  - title (character; optional): the html 'title' attribute for the option. allows for
information on hover. for more information on this attribute,
see https://developer.mozilla.org/en-us/docs/web/html/global_attributes/title
  - search (character; optional): optional search value for the option, to use if the label
is a component or provide a custom search value different
from the label. if no search value and the label is a
component, the `value` will be used for search.s. An array of options {label: [string|number], value: [string|number]},}

\item{placeholder}{Character. A placeholder in the dropdown input if no selection is made yet; default is 'Select...'}

\item{searchable}{Logical. Whether to enable the searching feature or not}

\item{style}{Named list. Defines CSS styles which will override styles previously set.}

\item{value}{Character | numeric | logical | list of character | numeric | logicals. The value of the input. If `multi` is false (the default)
then value is just a string that corresponds to the values
provided in the `options` property. If `multi` is true, then
multiple values can be selected at once, and `value` is an
array of items with values corresponding to those in the
`options` prop.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

