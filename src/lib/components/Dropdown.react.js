import React, { Component, MouseEventHandler } from 'react';
import Select, { components, MultiValueGenericProps, MultiValueProps, OnChangeValue, Props, DropdownIndicatorProps, IndicatorSeparatorProps } from 'react-select';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortEndHandler,
  SortableHandle,
} from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { sanitizeOptions, sanitizeValue } from '../utils/Sanitize'
import {isNil, pluck, without, pick} from 'ramda';

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

const SortableSelect = SortableContainer(Select)

const IndicatorSeparator = ({
  innerProps,
}) => {
  return null;
};

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    {props.isFocused ? (
      <MdArrowDropUp label="Arrow" size="25px" />
    ) : (
      <MdArrowDropDown label="Arrow" size="25px" />
    )}
  </components.DropdownIndicator>
);

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

/**
 * A dropdown similar to dcc.Dropdown, where the menu stays open when multi=true and a selection is made
 */
class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Handle the value change and communicate it to Dash via setProps.
     */
    handleChange = (selectedOption) => {
        const { multi, setProps } = this.props;

        let return_value;

        if (multi) {
                if (isNil(selectedOption)) {
                    return_value = [];
                } else {
                    return_value = pluck('value', selectedOption);
                }
        } else {
            if (isNil(selectedOption)) {
                return_value = null;
            } else {
                return_value = selectedOption.value;
            }
        };

        setProps({ value: return_value });
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        const { multi, setProps, value } = this.props;
        const newValue = arrayMove(value, oldIndex, newIndex);
        setProps({ value: newValue });
      };

    render() {

        const sanitizedOptions = sanitizeOptions(this.props.options)

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
                    options={sanitizedOptions}
                    value={sanitizeValue(this.props.value, this.props.multi, sanitizedOptions)}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    isDisabled={this.props.disabled}
                    isSearchable={this.props.searchable}
                    isClearable={this.props.clearable}
                    closeMenuOnSelect={!this.props.multi}
                    blurInputOnSelect={!this.props.multi}
                    backspaceRemoves={this.props.clearable}
                    deleteRemoves={this.props.clearable}
                    className={this.props.className}
                    classNamePrefix='react-select-dropdown'
                    components={{
                        DropdownIndicator,
                        IndicatorSeparator,
                        MultiValue: SortableMultiValue,
                        MultiValueLabel: SortableMultiValueLabel
                    }}
                    styles={colorStyles}
                />
            </div>
        );
    }
}

// PropTypes to enforce prop validation
Dropdown.propTypes = {
    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: PropTypes.string,
    /**
     * An array of options {label: [string|number], value: [string|number]},
     */
    options: PropTypes.oneOfType([
        /**
         * Array of options where the label and the value are the same thing - [string|number|bool]
         */
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
            ])
        ),
        /**
         * Simpler `options` representation in dictionary format. The order is not guaranteed.
         * {`value1`: `label1`, `value2`: `label2`, ... }
         * which is equal to
         * [{label: `label1`, value: `value1`}, {label: `label2`, value: `value2`}, ...]
         */
        PropTypes.object,
        /**
         * An array of options {label: [string|number], value: [string|number]},
         * an optional disabled field can be used for each option
         */
        PropTypes.arrayOf(
            PropTypes.exact({
                /**
                 * The option's label
                 */
                label: PropTypes.node.isRequired,

                /**
                 * The value of the option. This value
                 * corresponds to the items specified in the
                 * `value` property.
                 */
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                ]).isRequired,

                /**
                 * If true, this option is disabled and cannot be selected.
                 */
                disabled: PropTypes.bool,

                /**
                 * The HTML 'title' attribute for the option. Allows for
                 * information on hover. For more information on this attribute,
                 * see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title
                 */
                title: PropTypes.string,

                /**
                 * Optional search value for the option, to use if the label
                 * is a component or provide a custom search value different
                 * from the label. If no search value and the label is a
                 * component, the `value` will be used for search.
                 */
                search: PropTypes.string,
            })
        ),
    ]),

    /**
     * The value of the input. If `multi` is false (the default)
     * then value is just a string that corresponds to the values
     * provided in the `options` property. If `multi` is true, then
     * multiple values can be selected at once, and `value` is an
     * array of items with values corresponding to those in the
     * `options` prop.
     */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
            ])
        ),
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
     * Whether to enable the searching feature or not
     */
    searchable: PropTypes.bool,
    /**
     * Whether or not the dropdown is "clearable", that is, whether or
     * not a small "x" appears on the right of the dropdown that removes
     * the selected value.
     */
    clearable: PropTypes.bool,
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
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

Dropdown.defaultProps = {
    value: null,
    multi: false,
    placeholder: 'Select...',
    disabled: false,
    searchable: true,
    clearable: true,
};

export default Dropdown;
