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
          { value: 'granny', label: 'Granny Smith' },
          { value: 'honeycrisp', label: 'Honeycrisp' },
          { value: 'braeburn', label: 'Braeburn' },
        ]
      },
      { value: 'orange', label: 'Orange' },
      { value: 'banana', label: 'Banana' },
      { value: 'kiwi', label: 'Kiwi' },
      { value: 'mango', label: 'Mango' },
      { value: 'pineapple', label: 'Pineapple' },
      { value: 'watermelon', label: 'Watermelon' },
      { value: 'peach', label: 'Peach' },
      { value: 'pear', label: 'Pear' },
      { value: 'plum', label: 'Plum' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'apricot', label: 'Apricot' },
      { value: 'papaya', label: 'Papaya' },
      { value: 'guava', label: 'Guava' },
      { value: 'lychee', label: 'Lychee' },
      { value: 'dragonfruit', label: 'Dragon Fruit' },
      { value: 'passionfruit', label: 'Passion Fruit' },
      { value: 'fig', label: 'Fig' },
      { value: 'pomegranate', label: 'Pomegranate' },
      { value: 'coconut', label: 'Coconut' },
      { value: 'starfruit', label: 'Star Fruit' },
      { value: 'jackfruit', label: 'Jackfruit' },
      { value: 'durian', label: 'Durian' },
      { value: 'rambutan', label: 'Rambutan' },
    ],
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    suboptions: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
      { value: 'tomato', label: 'Tomato' },
      { value: 'cucumber', label: 'Cucumber' },
      { value: 'pepper', label: 'Pepper' },
      { value: 'onion', label: 'Onion' },
      { value: 'potato', label: 'Potato' },
    ],
  },
  {
    value: 'grains',
    label: 'Grains',
    suboptions: [
      { value: 'wheat', label: 'Wheat' },
      { value: 'rice', label: 'Rice' },
      { value: 'oats', label: 'Oats' },
      { value: 'barley', label: 'Barley' },
      { value: 'corn', label: 'Corn' },
    ],
  },
  {
    value: 'dairy',
    label: 'Dairy',
    suboptions: [
      { value: 'milk', label: 'Milk' },
      { value: 'cheese', label: 'Cheese' },
      { value: 'yogurt', label: 'Yogurt' },
      { value: 'butter', label: 'Butter' },
    ],
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const options = [
  { value: 'banana', label: 'Banana' },
  { value: 'apple', label: 'Apple' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'orange', label: 'Orange' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'lime', label: 'Lime' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'mango', label: 'Mango' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'grape', label: 'Grape' },
  { value: 'peach', label: 'Peach' },
  { value: 'pear', label: 'Pear' },
  { value: 'plum', label: 'Plum' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'papaya', label: 'Papaya' },
  { value: 'guava', label: 'Guava' },
];

const App = () => {
  const [state, setState] = useState({ value: ['banana', 'apple'] });
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
        <button onClick={() => setProps({ value: ['mango'] })}>Set to Mango</button>
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
