import React, { useState } from 'react';
import { MultiLevelDropdown, Dropdown } from '../lib/index';

const multi_options = [
  {
    value: 'fruits',
    label: 'Fruits',
    suboptions: [
      { value: 'apple', label: 'Apple', suboptions:
        [
            { value: 'gala', label: 'Gala' },
            { value: 'pinklady', label: 'Pink lady' },
        ]
        },
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
    label: 'Other',
  },
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
  const [state, setState] = useState({ value: null });
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

  // Handlers for the buttons
  const handleSetDropdownValue = () => {
    setProps({ value: ['fruits'] });
  };

  const handleSetMultiDropdownValue = () => {
    setPropsMulti({ value: [['vegetables', 'carrot']] });
  };

  const toggleMultiDropdown = () => {
    setIsMultiDropdown((prev) => !prev);
  };

  const toggleMultiLevelDropdown = () => {
    setIsMultiLevelDropdown((prev) => !prev);
  };

  return (
    <div>
      <div style={dropdown_style}>
        <Dropdown clearable={true} options={options} multi={isMultiDropdown} setProps={setProps} {...state} />
        <p>Selected: {JSON.stringify(state.value)}</p>
        <button onClick={handleSetDropdownValue}>Set Dropdown to Fruits</button>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input type="checkbox" checked={isMultiDropdown} onChange={toggleMultiDropdown} /> Toggle Multi for Dropdown
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
          submenu_widths={['10vw', '10vw']}
        />
        <p>Selected: {JSON.stringify(stateMulti.value)}</p>
        <button onClick={handleSetMultiDropdownValue}>Set MultiLevelDropdown to Vegetables > Carrot</button>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input type="checkbox" checked={isMultiLevelDropdown} onChange={toggleMultiLevelDropdown} /> Toggle Multi for MultiLevelDropdown
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
