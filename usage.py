import dash_dropdown_components
from dash import Dash, callback, html, Input, Output, dcc

app = Dash(__name__)

options = [
    {'value': 'banana', 'label': 'Banana'},
    {'value': 'apple', 'label': 'Apple'},
    {'value': 'strawberry', 'label': 'Strawberry'},
    {'value': 'kiwi', 'label': 'Kiwi'},
    {'value': 'orange', 'label': 'Orange'},
    {'value': 'blueberry', 'label': 'Blueberry Blueberry Blueberry Blueberry Blueberry Blueberry Blueberry Blueberry Blueberry'},
    {'value': 'lemon', 'label': 'Lemon'},
    {'value': 'lime', 'label': 'Lime'},
    {'value': 'mandarin', 'label': 'Mandarin'},
]

app.layout = html.Div(
    [
            html.Div([
        dcc.RadioItems(id='radioitem',
                       options=[{'label':  'True', 'value': True},
                                {'label':  'False', 'value': False}],
                       value=False),
        dcc.Dropdown(
            id='input',
            options=options,
            value=options[0]['value'],
            multi=False,
            clearable=False,
            disabled=False,
            searchable=False
        ),
        html.Div(id='output')
    ], style={'width': '50%', 'display': 'inline-block'}),
html.Div([
        dcc.RadioItems(id='radioitem2',
                       options=[{'label': 'True', 'value': True},
                                {'label': 'False', 'value': False}],
                       value=False),
        dash_dropdown_components.Dropdown(
            id='input2',
            options=options,
            value=options[0]['value'],
            multi=False,
            clearable=False,
            disabled=False,
            searchable=True
        ),
        html.Div(id='output2')
    ], style={'width': '50%', 'display': 'inline-block'})
],
style={'display': 'flex', 'flexDirection': 'row'})


@callback(Output('output', 'children'), Input('input', 'value'))
def display_output(value):
    return 'You have entered {}'.format(value)

@callback(Output('output2', 'children'), Input('input2', 'value'))
def display_output(value):
    return 'You have entered {}'.format(value)

@callback(Output('input2', 'multi'), Input('radioitem2', 'value'))
def set_multi(multi):
    return multi

@callback(Output('input', 'multi'), Input('radioitem', 'value'))
def set_multi(multi):
    return multi


if __name__ == '__main__':
    app.run(debug=True)
