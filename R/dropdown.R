# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dropdown <- function(id=NULL, className=NULL, clearable=NULL, disabled=NULL, multi=NULL, options=NULL, placeholder=NULL, searchable=NULL, style=NULL, value=NULL) {
    
    props <- list(id=id, className=className, clearable=clearable, disabled=disabled, multi=multi, options=options, placeholder=placeholder, searchable=searchable, style=style, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Dropdown',
        namespace = 'dash_dropdown_components',
        propNames = c('id', 'className', 'clearable', 'disabled', 'multi', 'options', 'placeholder', 'searchable', 'style', 'value'),
        package = 'dashDropdownComponents'
        )

    structure(component, class = c('dash_component', 'list'))
}
