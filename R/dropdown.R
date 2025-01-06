# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dropdown <- function(id=NULL, className=NULL, disabled=NULL, hide_options_on_select=NULL, multi=NULL, options=NULL, placeholder=NULL, searchable=NULL, style=NULL, value=NULL) {
    
    props <- list(id=id, className=className, disabled=disabled, hide_options_on_select=hide_options_on_select, multi=multi, options=options, placeholder=placeholder, searchable=searchable, style=style, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Dropdown',
        namespace = 'dash_dropdown_components',
        propNames = c('id', 'className', 'disabled', 'hide_options_on_select', 'multi', 'options', 'placeholder', 'searchable', 'style', 'value'),
        package = 'dashDropdownComponents'
        )

    structure(component, class = c('dash_component', 'list'))
}
