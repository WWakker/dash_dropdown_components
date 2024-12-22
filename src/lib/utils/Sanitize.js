// https://github.com/plotly/dash/blob/dev/components/dash-core-components/src/utils/optionTypes.js
import React from 'react';
import {type, isNil} from 'ramda';

export const sanitizeOptions = options => {
    if (type(options) === 'Object') {
        return Object.entries(options).map(([value, label]) => ([{
            label: React.isValidElement(label) ? label : String(label),
            value,
        }]));
    }

    if (type(options) === 'Array') {
        if (
            options.length > 0 &&
            ['String', 'Number', 'Bool'].includes(type(options[0]))
        ) {
            return options.map(option => ({
                label: String(option),
                value: option,
            }));
        }
    }

    return options;
};

export const sanitizeValue = (value, multi, sanitizedOptions) => {

    let return_value;

    if (isNil(value)) {
        return_value = multi ? [] : null;
    } else if (Array.isArray(value)) {
        return_value = (sanitizedOptions
        .filter(option => value.includes(option.value))
        .sort((a, b) => value.indexOf(a.value) - value.indexOf(b.value))
        );
    } else {
        return_value = sanitizedOptions.filter(option => option.value === value);
    };

    return return_value;
}
