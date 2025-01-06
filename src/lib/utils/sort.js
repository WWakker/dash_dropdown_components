import React from 'react';
import Select, { components } from 'react-select';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { isNil } from 'ramda';

export const arrayMove = (array, from, to) => {
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

export const SortableMultiValue = SortableElement( (props) => {
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

export const SortableMultiValueLabel = SortableHandle(
  (props) => <components.MultiValueLabel {...props} />
);

export const SortableSelect = SortableContainer(Select);
