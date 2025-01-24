
module DashDropdownComponents
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.9"

include("jl/dropdown.jl")
include("jl/multileveldropdown.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_dropdown_components",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_dropdown_components.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_dropdown_components.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
