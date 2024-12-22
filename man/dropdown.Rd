% Auto-generated: do not edit by hand
\name{dropdown}

\alias{dropdown}

\title{Dropdown component}

\description{

}

\usage{
dropdown(id=NULL, className=NULL, clearable=NULL, disabled=NULL,
multi=NULL, options=NULL, placeholder=NULL, searchable=NULL,
style=NULL, value=NULL)
}

\arguments{
\item{id}{Character. }

\item{className}{Character. }

\item{clearable}{Logical. }

\item{disabled}{Logical. }

\item{multi}{Logical. }

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
component, the `value` will be used for search.s. }

\item{placeholder}{Character. }

\item{searchable}{Logical. }

\item{style}{Named list. }

\item{value}{Character | numeric | logical | list of character | numeric | logicals. The value of the input. If `multi` is false (the default)
then value is just a string that corresponds to the values
provided in the `options` property. If `multi` is true, then
multiple values can be selected at once, and `value` is an
array of items with values corresponding to those in the
`options` prop.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

