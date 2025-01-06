import React, { Component, MouseEventHandler, Fragment, useState, useRef, useEffect } from 'react';
import Select, { components, MultiValueGenericProps, MultiValueProps, OnChangeValue, Props, DropdownIndicatorProps, IndicatorSeparatorProps } from 'react-select';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortEndHandler,
  SortableHandle,
} from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import { MdArrowDropUp, MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { flattenOptions, nestOptions, sanitizeValueMultiLevel } from '../utils/SanitizeMultiLevel'
import {isNil, pluck, without, pick} from 'ramda';
import '../styles.css'

const arrayMove = (array, from, to) => {
    if (!Array.isArray(array)) {
        if (isNil(array)) {
            return []
        } else {
            return [array]
        }
    }
    const slicedArray = array.slice();
    // Remove the item from the starting index
    const [movedItem] = slicedArray.splice(from, 1);
    // Insert the item at the ending index
    slicedArray.splice(to, 0, movedItem);

  return slicedArray;
}

const SortableMultiValue = SortableElement( (props) => {
    // this prevents the menu from being opened/closed when the user clicks
    // on a value to begin dragging it. ideally, detecting a click (instead of
    // a drag) would still focus the control and toggle the menu, but that
    // requires some magic with refs that are out of scope for this example
    const onMouseDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const innerProps = { ...props.innerProps, onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
  }
);

const SortableMultiValueLabel = SortableHandle(
  (props) => <components.MultiValueLabel {...props} />
);

const SortableSelect = SortableContainer(Select);

const IndicatorSeparator = ({
  innerProps,
}) => {
  return null;
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <MdArrowDropUp label="Arrow" size="25px" />
      ) : (
        <MdArrowDropDown label="Arrow" size="25px" />
      )}
    </components.DropdownIndicator>
  );
};

const colorStyles = {
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: 'rgba(0, 50, 153, 0.05)', // Use the value for the background color
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "rgba(0, 50, 153, 1)", // Set the text color
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "rgba(0, 50, 153, 1)",
    backgroundColor: 'rgba(0, 50, 153, 0.1)',
    ':hover': {
      backgroundColor: 'rgba(0, 50, 153, 1)',
      color: 'white',
    },
  }),
};

// Recursive Component for Menu Items
const MultiLevelOption = (props) => {
  const { data, innerRef, innerProps, selectOption, ...rest } = props
  const isSelected = props.isMulti ? props.selectedOptions.some(selected => JSON.stringify(selected) === JSON.stringify(data.value)): JSON.stringify(props.selectedOptions) === JSON.stringify(data.value)

  if (isSelected && props.hideOptionsOnSelect) return null
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={isSelected ? "ddc-ml-option ddc-ml-option-is-selected": "ddc-ml-option"}
      onClick={(e) => {
        if (!data.suboptions) {
            selectOption(data);
        }
      }}
    >
      <span style={{ flex: 1 }}>{String(data.label.slice(-1))}</span>
      {data.suboptions && data.suboptions.length > 0 && (
        <span style={{ marginLeft: "auto" }}><MdArrowRight label="Arrow" size='15px' className='ddc-ml-dropdown-arrow-right'/></span>
      )}
      {data.suboptions && data.suboptions.length > 0 && (
        <div className="ddc-ml-submenu">
          {data.suboptions.map((subOption) => (
            <MultiLevelOption
              key={subOption.value}
              data={subOption}
              innerRef={innerRef}
              innerProps={innerProps}
              selectOption={selectOption}
              {...rest}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MultiLevelOptionWrapper = (selectedOptions, hideOptionsOnSelect) => (props) => {
  return <MultiLevelOption {...props} selectedOptions={selectedOptions} hideOptionsOnSelect={hideOptionsOnSelect} />;
};

const CustomMenuList = (props) => {

  return (
    <components.MenuList {...props}>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child)
      )}
    </components.MenuList>
  );
};

/**
 * A dropdown similar to dcc.Dropdown, where the menu stays open when multi=true and a selection is made
 */
class MultiLevelDropdown extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        const stateValue = isNil(props.value) ? props.multi ? [[]] : [] : props.value
        this.state = { value: stateValue }
    }

    // Change value from item to list or reverse when multi changes
    componentWillReceiveProps(nextProps) {
        const { setProps } = this.props;
        if (this.props.multi !== nextProps.multi) {

            let newValue = this.props.value;
            if (isNil(newValue)) {
                newValue = nextProps.multi ? [] : null;
            } else {
                newValue = nextProps.multi ? [newValue] : newValue[0];
            }

            if (setProps) {
                setProps({ value: newValue });
            }
            this.setState({ value: newValue })
        }
    }

    /**
     * Handle the value change and communicate it to Dash via setProps.
     */
    handleChange = (selectedOption) => {
        const { multi, setProps } = this.props;

        let newValue;

        if (multi) {
                if (isNil(selectedOption)) {
                    newValue = [];
                } else {
                    newValue = pluck('value', selectedOption);
                }
        } else {
            if (isNil(selectedOption)) {
                newValue = null;
            } else {
                newValue = selectedOption.value;
            }
        };

        this.setState({ value: newValue })
        if (setProps) {
            setProps({ value: newValue });
        }
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        const { multi, setProps, value } = this.props;
        const newValue = arrayMove(value, oldIndex, newIndex);
        this.setState({ value: newValue })
        if (setProps) {
            setProps({ value: newValue });
        }
      };

    render() {

        const nestedOptions = nestOptions(this.props.options)
        const flattenedOptions = flattenOptions(nestedOptions)
        const sanitizedValue = sanitizeValueMultiLevel(this.state.value, flattenedOptions)

        return (
             <div
                id={this.props.id}
                className="dash-dropdown"
                style={this.props.style}
            >
                <SortableSelect
                    useDragHandle
                    axis='xy'
                    onSortEnd={this.onSortEnd}
                    distance={4}
                    getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                    isMulti={this.props.multi}
                    options={nestedOptions}
                    value={sanitizedValue}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    isDisabled={this.props.disabled}
                    isSearchable={false}
                    isClearable={this.props.multi}
                    closeMenuOnSelect={!this.props.multi}
                    blurInputOnSelect={!this.props.multi}
                    backspaceRemoves={this.props.clearable}
                    hideSelectedOptions={false}
                    className={this.props.className}
                    classNamePrefix='ddc-ml-dropdown'
                    components={{
                        DropdownIndicator: DropdownIndicator,
                        IndicatorSeparator: IndicatorSeparator,
                        Option: MultiLevelOptionWrapper(this.state.value, this.props.hide_options_on_select),
                        MenuList: CustomMenuList,
                        MultiValue: SortableMultiValue,
                        MultiValueLabel: SortableMultiValueLabel
                    }}
                    formatOptionLabel={(option, { context }) => {
                        return context === "menu" ? option.label.slice(-1) : option.label.join('>');
                    }}
                    styles={colorStyles}
                />
            </div>
        );
    }
}

// PropTypes to enforce prop validation
MultiLevelDropdown.propTypes = {
    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: PropTypes.string,
    /**
     * An array of options {label: [string|number], value: [string|number]},
     */
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                    ]).isRequired,
        label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                    ]).isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                    ]).isRequired,
          label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                    ]).isRequired,
        })),
      })),

    /**
     * The value of the input. If multi is false (the default)
     * then value is just a string that corresponds to the values
     * provided in the options property. If multi is true, then
     * multiple values can be selected at once, and value is an
     * array of items with values corresponding to those in the
     * options prop.
     */
    value: PropTypes.oneOfType([
        PropTypes.arrayOf(
                PropTypes.arrayOf(PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                    ])
                )
        ),
        PropTypes.arrayOf(PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                    ])
                )
    ]),
    /**
     * If true, the user can select multiple values
     */
    multi: PropTypes.bool,
    /**
     * A placeholder in the dropdown input if no selection is made yet; default is 'Select...'
     */
    placeholder: PropTypes.string,
    /**
     * If true, this dropdown is disabled and the selection cannot be changed.
     */
    disabled: PropTypes.bool,
    /**
     * If true, options are removed when selected.
     */
    hide_options_on_select: PropTypes.bool,
    /**
     * Whether to enable the searching feature or not
     */
    setProps: PropTypes.func,
    /**
     * Defines CSS styles which will override styles previously set.
     */
    style: PropTypes.object,
    /**
     * className of the dropdown element
     */
    className: PropTypes.string,
};

MultiLevelDropdown.defaultProps = {
    value: null,
    multi: false,
    placeholder: 'Select...',
    disabled: false,
    hide_options_on_select: false
};

export default MultiLevelDropdown;
