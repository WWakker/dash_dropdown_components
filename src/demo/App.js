import React, { useState } from 'react';
import {MultiLevelDropdown, Dropdown} from '../lib/index';

const multi_options = [
  {
    value: 'fruits',
    label: 'Fruits',
    suboptions: [
      { value: 'apple', label: 'Apple', suboptions: [{ value: 'gala', label: 'Gala'}]},
      { value: 'orange', label: 'Orange' },
      { value: 'banana', label: 'Banana' },
      { value: 'kiwi', label: 'Kiwi' },
    ],
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    suboptions: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
  {
    value: 'other',
    label: 'Other'
  }
];

[
  {
    value: 'fruits',
    label: 'Fruits',
    suboptions: [
      { value: 'fruits<<&>>apple', label: 'Fruits<<&>>Apple', suboptions: [{ value: 'fruits<<&>>apple<<&>>gala', label: 'Fruits<<&>>Apple<<&>>Gala'}]},
      { value: 'fruits<<&>>orange', label: 'Fruits<<&>>Orange' },
      { value: 'fruits<<&>>banana', label: 'Fruits<<&>>Banana' },
      { value: 'fruits<<&>>kiwi', label: 'Fruits<<&>>Kiwi' },
    ],
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    suboptions: [
      { value: 'vegetables<<&>>carrot', label: 'Vegetables<<&>>Carrot' },
      { value: 'vegetables<<&>>broccoli', label: 'Vegetables<<&>>Broccoli' },
    ],
  },
  {
    value: 'other',
    label: 'Other'
  }
];

const options = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
  },
];

const App = () => {
    const [state, setState] = useState({value:''});
    const [stateMulti, setStateMulti] = useState({value:[['fruits', 'banana']]});
    const setProps = (newProps) => {
        setState((prevState) => ({ ...prevState, ...newProps }));
    };
    const setPropsMulti = (newProps) => {
        setStateMulti((prevState) => ({ ...prevState, ...newProps }));
    };

  const dropdown_style = {
    width: '25%',
    display: 'inline-block'
  }

  return (
    <div>
        <div style={dropdown_style}>
            <Dropdown options={options} multi={true} setProps={setProps} {...state} />
            {<p>Selected: {JSON.stringify(state.value)}</p>}
        </div>
        <div style={dropdown_style}>
            <MultiLevelDropdown options={multi_options} multi={true} setProps={setPropsMulti} {...stateMulti} submenu_widths={['10vw', '10vw']}/>
            {<p>Selected: {JSON.stringify(stateMulti.value)}</p>}
        </div>
    </div>
  );
};

export default App;
