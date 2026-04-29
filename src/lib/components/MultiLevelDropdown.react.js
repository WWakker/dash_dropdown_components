import React, { Component } from 'react';
import Select from 'react-select';
import {isNil, pluck} from 'ramda';
import PropTypes from 'prop-types';
import { flattenOptions, nestOptions, sanitizeValueMultiLevel } from '../utils/sanitizemultilevel'
import { IndicatorSeparator, DropdownIndicator, colorStyles} from '../utils/helpers'
import '../styles.css'

// Recursive component for menu items. Extra data arrives via selectProps to avoid
// recreating a wrapper component type on every render (which causes full remounts).
const MultiLevelOption = ({ data, innerRef, innerProps, selectOption, selectProps, isMulti }) => {
  const { ddcSelectedOptions, ddcHideOptionsOnSelect, ddcSubmenuWidths } = selectProps;

  const isSelected = isMulti
    ? (ddcSelectedOptions || []).some(selected => JSON.stringify(selected) === JSON.stringify(data.value))
    : JSON.stringify(ddcSelectedOptions) === JSON.stringify(data.value);

  if (isSelected && ddcHideOptionsOnSelect) return null;

  const submenuWidth = ddcSubmenuWidths ? { width: ddcSubmenuWidths[data.value.length - 1] } : {};

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={isSelected ? "ddc-ml-option ddc-ml-option-is-selected" : "ddc-ml-option"}
      onClick={() => {
        if (!data.suboptions) {
          selectOption(data);
        }
      }}
    >
      <span style={{ flex: 1 }}>{data.label.at(-1)}</span>
      {data.suboptions && data.suboptions.length > 0 && (
        <>
          <span className='ddc-ml-dropdown-arrow-right'>‣</span>
          <div className="ddc-ml-submenu" style={submenuWidth}>
            {data.suboptions.map((subOption) => (
              <MultiLevelOption
                key={JSON.stringify(subOption.value)}
                data={subOption}
                selectOption={selectOption}
                selectProps={selectProps}
                isMulti={isMulti}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Defined outside the class so react-select never sees a new component type between renders.
const customComponents = {
  DropdownIndicator,
  IndicatorSeparator,
  Option: MultiLevelOption,
};

/**
 * A dropdown similar to dcc.Dropdown but with multiple levels, where the menu stays open when multi=true and a selection is made
 */
class MultiLevelDropdown extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this._nestedOptions = nestOptions(props.options || []);
        this._flattenedOptions = flattenOptions(this._nestedOptions);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.options !== this.props.options) {
            this._nestedOptions = nestOptions(this.props.options || []);
            this._flattenedOptions = flattenOptions(this._nestedOptions);
        }

        const { multi, setProps, value } = this.props;
        if (prevProps.multi !== multi) {
            let newValue = value;
            if (isNil(newValue) || (Array.isArray(newValue) && newValue.length === 0)) {
                newValue = multi ? [] : null;
            } else {
                if ((multi && newValue.some(element => Array.isArray(element))) ||
                    (!multi && !newValue.some(element => Array.isArray(element)))
                ) {
                    return;
                }
                newValue = multi ? [newValue] : newValue[0];
            }

            if (setProps) {
                setProps({ value: newValue });
            }
        }
    }

    handleChange = (selectedOption) => {
        const { multi, setProps } = this.props;

        let newValue;

        if (multi) {
            if (isNil(selectedOption) || (Array.isArray(selectedOption) && selectedOption.length === 0)) {
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
        }

        if (setProps) {
            setProps({ value: newValue });
        }
    };

    render() {
        const sanitizedValue = sanitizeValueMultiLevel(this.props.value, this._flattenedOptions);

        return (
            <div
                id={this.props.id}
                className="dash-dropdown"
                style={this.props.style}
            >
                <Select
                    isMulti={this.props.multi}
                    options={this._nestedOptions}
                    value={sanitizedValue}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    isDisabled={this.props.disabled}
                    isSearchable={false}
                    isClearable={this.props.clearable ?? this.props.multi}
                    closeMenuOnSelect={!this.props.multi}
                    blurInputOnSelect={!this.props.multi}
                    backspaceRemoves={this.props.clearable ?? this.props.multi}
                    hideSelectedOptions={false}
                    className={this.props.className}
                    classNamePrefix='ddc-ml-dropdown'
                    components={customComponents}
                    formatOptionLabel={(option, { context }) => {
                        return context === "menu" ? option.label.at(-1) : option.label.join('>');
                    }}
                    styles={colorStyles}
                    ddcSelectedOptions={this.props.value}
                    ddcHideOptionsOnSelect={this.props.hide_options_on_select}
                    ddcSubmenuWidths={this.props.submenu_widths}
                />
            </div>
        );
    }
}

MultiLevelDropdown.propTypes = {
    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: PropTypes.string,
    /**
     * An array of options {label: [string|number], value: [string|number]},
     * with an optional suboptions key for nested levels.
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
        suboptions: PropTypes.arrayOf(PropTypes.shape({
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
     * Whether or not the dropdown is "clearable", that is, whether or
     * not a small "x" appears on the right of the dropdown that removes
     * the selected value.
     */
    clearable: PropTypes.bool,
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
     * Control the width of the submenu for each level. Can be in percentage of the preceding level or fixed widths.
     */
    submenu_widths: PropTypes.array,
    /**
     * Dash-supplied function for updating props.
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
    multi: false,
    placeholder: 'Select...',
    disabled: false,
    hide_options_on_select: true,
};

export default MultiLevelDropdown;
