// https://github.com/plotly/dash/blob/dev/components/dash-core-components/src/utils/optionTypes.js
import React from 'react';
import {type, isNil} from 'ramda';

export const flattenOptions = (options) => {
  const result = [];

  options.forEach(option => {
    // Push the current option without its suboptions
    const { suboptions, ...flatOption } = option;
    result.push(flatOption);

    // If suboptions exist, recursively process them
    if (suboptions) {
      result.push(...flattenOptions(suboptions));
    }
  });

  return result;
}

export const nestOptions = (options, parentValue = [], parentLabel = []) => {
  return options.map(option => {
    const currentValue = [...parentValue, option.value];
    const currentLabel = [...parentLabel, option.label];

    const result = {
      value: currentValue,
      label: currentLabel,
    };

    // If suboptions exist, recursively transform them
    if (option.suboptions) {
      result.suboptions = nestOptions(option.suboptions, currentValue, currentLabel);
    }

    return result;
  });
};

export const sanitizeValueMultiLevel = (value, sanitizedOptions) => {

    let result;

    if (isNil(value)) {
        result = null;
    } else if (value.some(element => Array.isArray(element))) {
        result = value
        .map(criteria => sanitizedOptions.find(item => JSON.stringify(item.value) === JSON.stringify(criteria)));
    } else {
        result = sanitizedOptions.filter(item => JSON.stringify(item.value) === JSON.stringify(value));
    };

    return result;
}
