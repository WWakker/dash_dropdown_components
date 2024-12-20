import React, { Component } from 'react';
import Select, { components, DropdownIndicatorProps, IndicatorSeparatorProps } from 'react-select';
import PropTypes from 'prop-types';
import { MdArrowRight, MdArrowDropDown, MdEdit, MdBarChart } from "react-icons/md";


const IndicatorSeparator = ({
  innerProps,
}) => {
  return null;
};

const DropdownIndicator = (
  props
) => {
  return (
    <components.DropdownIndicator {...props}>
      <MdArrowDropDown label="Arrow" size='25px' />
    </components.DropdownIndicator>
  );
};

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Format the value to match react-select's expected structure.
     */
     /**
    formatValue(value) {
        const { multi } = this.props;
        if (multi) {
            return Array.isArray(value) ? value.map(v => ({ value: v, label: v })) : [];
        }
        return value ? { value, label: value } : null;
    }
    */


    /**
     * Handle the value change and communicate it to Dash via setProps.
     */
    handleChange = (selectedOption) => {
        console.log(selectedOption)
        const { multi, setProps } = this.props;

        setProps({ value: selectedOption });
    }

    render() {

        return (
             <div
                id={this.props.id}
                className="dash-dropdown"
                style={this.props.style}
            >
                <Select
                    isMulti={this.props.multi}
                    options={this.props.options}
                    value={this.props.value}
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
                    components={{ DropdownIndicator, IndicatorSeparator }}
                />
            </div>
        );
    }
}

// PropTypes to enforce prop validation
Dropdown.propTypes = {
    id: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string,
        })
    ).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                label: PropTypes.string,
            })
        ),
        PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                label: PropTypes.string,
            })
    ]),
    multi: PropTypes.bool,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    searchable: PropTypes.bool,
    clearable: PropTypes.bool,
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,
    style: PropTypes.object,
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
