import React, { useState } from 'react';
import { MultiLevelDropdown, Dropdown } from '../lib/index';

const multi_options = [
  {
    value: 'fruits',
    label: 'Fruits',
    suboptions: [
      { value: 'apple', label: 'Apple', suboptions: [
          { value: 'gala', label: 'Gala' },
          { value: 'pinklady', label: 'Pink Lady' },
          { value: 'fuji', label: 'Fuji' },
        ]
      },
      { value: 'orange', label: 'Orange' },
      { value: 'banana', label: 'Banana' },
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
    label: 'Other',
  },
];

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'kiwi', label: 'Kiwi' },
];

const App = () => {
  const [state, setState] = useState({ value: ['apple', 'banana'] });
  const [stateMulti, setStateMulti] = useState({ value: [['fruits', 'banana']] });
  const [isMultiDropdown, setIsMultiDropdown] = useState(true);
  const [isMultiLevelDropdown, setIsMultiLevelDropdown] = useState(true);

  const setProps = (newProps) => {
    setState((prevState) => ({ ...prevState, ...newProps }));
  };

  const setPropsMulti = (newProps) => {
    setStateMulti((prevState) => ({ ...prevState, ...newProps }));
  };

  const dropdown_style = {
    width: '25%',
    display: 'inline-block',
    marginRight: '20px',
  };

  return (
    <div>
      <div style={dropdown_style}>
        <Dropdown clearable={true} options={options} multi={isMultiDropdown} setProps={setProps} {...state} />
        <p>Selected: {JSON.stringify(state.value)}</p>
        <button onClick={() => setProps({ value: ['apple'] })}>Set to Apple</button>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input type="checkbox" checked={isMultiDropdown} onChange={() => setIsMultiDropdown(p => !p)} /> Toggle Multi
          </label>
        </div>
      </div>
      <div style={dropdown_style}>
        <MultiLevelDropdown
          clearable={true}
          options={multi_options}
          multi={isMultiLevelDropdown}
          setProps={setPropsMulti}
          {...stateMulti}
          submenu_widths={['150px', '150px']}
        />
        <p>Selected: {JSON.stringify(stateMulti.value)}</p>
        <button onClick={() => setPropsMulti({ value: [['vegetables', 'carrot']] })}>Set to Vegetables &gt; Carrot</button>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input type="checkbox" checked={isMultiLevelDropdown} onChange={() => setIsMultiLevelDropdown(p => !p)} /> Toggle Multi
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
