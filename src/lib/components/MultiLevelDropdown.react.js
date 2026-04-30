import React, { Component, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Select from 'react-select';
import {isNil, pluck} from 'ramda';
import PropTypes from 'prop-types';
import { flattenOptions, nestOptions, sanitizeValueMultiLevel } from '../utils/sanitizemultilevel'
import { IndicatorSeparator, DropdownIndicator, colorStyles} from '../utils/helpers'
import '../styles.css'

// Recursive component for menu items. Extra data arrives via selectProps to avoid
// recreating a wrapper component type on every render (which causes full remounts).
//
// The submenu is rendered via React Portal at document.body so it escapes every
// ancestor's stacking context, transform, and overflow. Visibility and position
// are managed via direct DOM manipulation through refs (not React state) so that
// rapid hover/scroll events never trigger re-renders that could disturb scroll.
const MultiLevelOption = ({ data, innerRef, innerProps, selectOption, selectProps, isMulti }) => {
  const { ddcSelectedOptions, ddcHideOptionsOnSelect, ddcSubmenuWidths } = selectProps;
  const optionRef = useRef(null);
  const submenuRef = useRef(null);
  const hideTimeout = useRef(null);
  const scrollListener = useRef(null);

  const detachScrollListener = () => {
    if (scrollListener.current) {
      window.removeEventListener('scroll', scrollListener.current, true);
      scrollListener.current = null;
    }
  };

  const hideSubmenu = () => {
    if (submenuRef.current) submenuRef.current.style.display = 'none';
    detachScrollListener();
  };

  useEffect(() => () => {
    clearTimeout(hideTimeout.current);
    detachScrollListener();
  }, []);

  const isSelected = isMulti
    ? (ddcSelectedOptions || []).some(selected => JSON.stringify(selected) === JSON.stringify(data.value))
    : JSON.stringify(ddcSelectedOptions) === JSON.stringify(data.value);

  if (isSelected && ddcHideOptionsOnSelect) return null;

  const hasSubmenu = data.suboptions && data.suboptions.length > 0;
  const submenuWidth = ddcSubmenuWidths ? { width: ddcSubmenuWidths[data.value.length - 1] } : {};

  const showSubmenu = () => {
    clearTimeout(hideTimeout.current);
    if (!hasSubmenu || !optionRef.current || !submenuRef.current) return;
    const rect = optionRef.current.getBoundingClientRect();
    const sm = submenuRef.current;
    const margin = 8;

    sm.style.top = `${rect.top}px`;
    sm.style.maxHeight = `${Math.min(300, window.innerHeight - rect.top - margin)}px`;
    sm.style.display = 'block';
    sm.scrollTop = 0;

    const width = sm.offsetWidth;
    const fitsRight = rect.right + width <= window.innerWidth - margin;
    const fitsLeft = rect.left - width >= margin;

    let left;
    if (fitsRight) {
      left = rect.right;
    } else if (fitsLeft) {
      left = rect.left - width;
    } else {
      left = Math.max(margin, window.innerWidth - width - margin);
    }
    sm.style.left = `${left}px`;

    detachScrollListener();
    scrollListener.current = (e) => {
      if (submenuRef.current && submenuRef.current.contains(e.target)) return;
      hideSubmenu();
    };
    window.addEventListener('scroll', scrollListener.current, true);
  };

  const scheduleHide = () => {
    hideTimeout.current = setTimeout(hideSubmenu, 100);
  };

  const cancelHide = () => clearTimeout(hideTimeout.current);

  return (
    <div
      ref={(el) => {
        optionRef.current = el;
        if (typeof innerRef === 'function') innerRef(el);
        else if (innerRef) innerRef.current = el;
      }}
      {...innerProps}
      className={isSelected ? "ddc-ml-option ddc-ml-option-is-selected" : "ddc-ml-option"}
      onMouseEnter={showSubmenu}
      onMouseLeave={scheduleHide}
      onClick={() => {
        if (!hasSubmenu) selectOption(data);
      }}
    >
      <span style={{ flex: 1 }}>{data.label[data.label.length - 1]}</span>
      {hasSubmenu && <span className='ddc-ml-dropdown-arrow-right'>‣</span>}
      {hasSubmenu && createPortal(
        <div
          ref={submenuRef}
          className="ddc-ml-submenu"
          style={submenuWidth}
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        >
          {data.suboptions.map((subOption) => (
            <MultiLevelOption
              key={JSON.stringify(subOption.value)}
              data={subOption}
              selectOption={selectOption}
              selectProps={selectProps}
              isMulti={isMulti}
            />
          ))}
        </div>,
        document.body
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
        this._lastOptions = props.options;
        this._nestedOptions = nestOptions(props.options || []);
        this._flattenedOptions = flattenOptions(this._nestedOptions);
    }

    componentDidUpdate(prevProps) {
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
        if (this.props.options !== this._lastOptions) {
            this._lastOptions = this.props.options;
            this._nestedOptions = nestOptions(this.props.options || []);
            this._flattenedOptions = flattenOptions(this._nestedOptions);
        }
        const sanitizedValue = sanitizeValueMultiLevel(this.props.value, this._flattenedOptions);

        return (
            <div
                id={this.props.id}
                className="ddc-dropdown"
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
                        return context === "menu" ? option.label[option.label.length - 1] : option.label.join('>');
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
