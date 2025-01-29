import React, { Component, MouseEventHandler } from 'react';
import { components } from 'react-select';
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

export const IndicatorSeparator = ({
  innerProps,
}) => {
  return null;
};

export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <MdArrowDropUp label="Arrow" size="20px" />
      ) : (
        <MdArrowDropDown label="Arrow" size="20px" />
      )}
    </components.DropdownIndicator>
  );
};

export const colorStyles = {
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
