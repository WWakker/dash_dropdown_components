import dash_dropdown_components
from dash import Dash, callback, html, Input, Output, dcc

app = Dash(__name__)

options = [
    {'value': 'banana', 'label': 'Banana'},
    {'value': 'apple', 'label': 'Apple'},
    {'value': 'strawberry', 'label': 'Strawberry'},
    {'value': 'kiwi', 'label': 'Kiwi'},
    {'value': 'orange', 'label': 'Orange'},
    {'value': 'blueberry', 'label': 'Blueberry'},
    {'value': 'lemon', 'label': 'Lemon'},
    {'value': 'lime', 'label': 'Lime'},
    {'value': 'mandarin', 'label': 'Mandarin'},
]

multi_level_options = [
    {
        'label': 'Fruits',
        'value': 'fruits',
        'suboptions': [
            { 'label': 'Apple', 'value': 'apple' },
            { 'label': 'Banana', 'value': 'banana' },
            { 'label': 'Berries',
              'value': 'berries',
              'suboptions': [
                  { 'label': 'Strawberry', 'value': 'strawberry'},
                  { 'label': 'Blueberry', 'value': 'blueberry'}
                ]
            }
    ]},
    {
        'label': 'Vegetables',
        'value': 'vegetables',
        'suboptions': [
            {
            'label': 'Potato',
            'value': 'potato'
            },
            {
            'label': 'Carrot',
            'value': 'carrot'
            },
    ]}
]; 

app.layout = html.Div(
    [
html.Div([
        html.P('ddc.Dropdown'),
        dcc.RadioItems(id='ddc-dd-multi',
                       options=[{'label': 'Multi: True', 'value': True},
                                {'label': 'Multi: False', 'value': False}],
                       value=False),
        dash_dropdown_components.Dropdown(
            id='ddc-dd',
            options=options,
            value=options[0]['value'],
            multi=False,
            disabled=False,
            searchable=True,
            hide_options_on_select=True
        ),
        html.Div(id='ddc-dd-selection')
    ], style={'width': '25%', 'display': 'inline-block'}),
html.Div([
        html.P('ddc.MultiLevelDropdown'),
        dcc.RadioItems(id='ddc-mldd-multi',
                       options=[{'label': 'Multi: True', 'value': True},
                                {'label': 'Multi: False', 'value': False}],
                       value=False),
        dash_dropdown_components.MultiLevelDropdown(
            id='ddc-mldd',
            options=multi_level_options,
            value=['fruits', 'banana'],
            multi=False,
            disabled=False,
            hide_options_on_select=True,
            submenu_widths=['10vw', '20vw']
        ),
        html.Div(id='ddc-mldd-selection')
    ], style={'width': '25%', 'display': 'inline-block'}),
],
style={'display': 'flex', 'flexDirection': 'row'})


@callback(Output('ddc-dd-selection', 'children'),
          Input('ddc-dd', 'value'))
def display_output(value):
    return 'You have entered {}'.format(value)

@callback(Output('ddc-mldd-selection', 'children'),
          Input('ddc-mldd', 'value'))
def display_output(value):
    return 'You have entered {}'.format(value)

@callback(Output('ddc-dd', 'multi'),
          Input('ddc-dd-multi', 'value'))
def set_multi(multi):
    return multi

@callback(Output('ddc-mldd', 'multi'),
          Input('ddc-mldd-multi', 'value'))
def set_multi(multi):
    return multi


if __name__ == '__main__':
    app.run(debug=True)
