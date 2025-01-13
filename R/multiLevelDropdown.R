# AUTO GENERATED FILE - DO NOT EDIT

#' @export
multiLevelDropdown <- function(id=NULL, className=NULL, clearable=NULL, disabled=NULL, hide_options_on_select=NULL, multi=NULL, options=NULL, placeholder=NULL, style=NULL, submenu_widths=NULL, value=NULL) {
    
    props <- list(id=id, className=className, clearable=clearable, disabled=disabled, hide_options_on_select=hide_options_on_select, multi=multi, options=options, placeholder=placeholder, style=style, submenu_widths=submenu_widths, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'MultiLevelDropdown',
        namespace = 'dash_dropdown_components',
        propNames = c('id', 'className', 'clearable', 'disabled', 'hide_options_on_select', 'multi', 'options', 'placeholder', 'style', 'submenu_widths', 'value'),
        package = 'dashDropdownComponents'
        )

    structure(component, class = c('dash_component', 'list'))
}
