"use client";
import { useState, useRef, useEffect, ReactElement, ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";
// TODO: Hacer que se pueda seleccionar una sola opcion
type SelectOption = {
  value: string;
  children: string;
  default: boolean;
  defaultSelected: boolean;
};

interface CustomSelectProps {
  children: ReactElement<SelectOption> | ReactElement<SelectOption>[];
  multiple?: boolean;
}

export default function CustomSelect({
  children,
  multiple,
}: CustomSelectProps) {
  const options = Array.isArray(children)
    ? children.map((option) => {
        return {
          value: option.props.value,
          text: option.props.children,
          default: option.props.default || false,
          defaultSelected: option.props.defaultSelected,
        };
      })
    : {
        value: children.props.value,
        text: children.props.children,
        default: children.props.default || false,
        defaultSelected: children.props.defaultSelected,
      };

  // This is the text showed in the select
  const defaultOption = Array.isArray(options)
    ? options.find((option) => option.default) || options[0]
    : options;

  const defaultSelectedItems = Array.isArray(options)
    ? options
        .filter((option) => option.defaultSelected)
        .map((option) => option.value)
    : (options.defaultSelected && [options.value]) || [];

  // If there are items defined as 'defaultSelected' but the CustomSelect is not of type 'multiple'
  // an error will be throwed because in no multiple selects the default items is the only one default selected
  if (defaultSelectedItems.length && !multiple) {
    throw new Error(`CustomSelect component must be of type 'multiple' to support default selected items. 
        Single option selects can only have one default option setted by using 'default'.`);
  }

  const [isOpen, setOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState(
    (defaultSelectedItems.length && defaultSelectedItems) || [
      defaultOption.value,
    ]
  );

  const selectRef = useRef<HTMLDivElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    document.addEventListener("mousedown", toggleDropDown);
  }, []);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const renderizeOptions = () => {
    if (Array.isArray(children)) {
      return children.map((option, index) => {
        const isItemSelected = selectedItems.includes(option.props.value);

        return React.cloneElement(option as React.ReactElement, {
          onClickCallback: handleOptionClicked,
          isSelected: isItemSelected,
          key: `custom_option_${index}`,
        });
      });
    } else {
      return children;
    }
  };

  const handleOptionClicked = (optionValue?: string, optionText?: string) => {
    if (!optionValue) return null;

    if (multiple) {
      const newSelectedItems = selectedItems;
      const indexOfNewSelectedItem = newSelectedItems.indexOf(optionValue);

      // If item was not selected i add it
      if (indexOfNewSelectedItem === -1) {
        newSelectedItems.push(optionValue);
      } else {
        // If item already is selected i remove it from the selected items list
        newSelectedItems.splice(indexOfNewSelectedItem, 1);
      }

      setSelectedItems([...newSelectedItems]);
    } else {
      setSelectedItems([optionValue]);
      setOpen(false);
    }
  };

  const toggleDropDown = (event: MouseEvent) => {
    // If you touch the select and it its closed
    if (
      !isOpenRef.current &&
      selectRef.current?.contains(event.target as Node)
    ) {
      setOpen(true);
    } else if (
      // If select is open and you touch outside the options container
      isOpenRef.current &&
      !optionsContainerRef.current?.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const getLongestOption = () => {
    let longestOption;

    if (Array.isArray(options)) {
      longestOption = options.reduce((longest, current) => {
        return current.text.length > longest.text.length ? current : longest;
      }, options[0]);
    } else {
      longestOption = options;
    }

    return longestOption.text;
  };

  return (
    <div className="bg-dark-100 p-2 rounded-sm cursor-pointer relative">
      <div
        className="absolute top-0 left-0 w-full h-full z-20"
        ref={selectRef}
      />

      <div className="flex items-center space-x-2">
        <p className="opacity-0 mr-6">{getLongestOption()}</p>
        <p className="absolute left-0">{defaultOption?.text}</p>
        <IoIosArrowDown className="absolute right-[10px]" />
      </div>

      <div
        className={`absolute top-100 left-0 bg-dark-200 z-50 w-full p-1 rounded-md mt-2 whitespace-nowrap
        ${isOpen ? "block" : "hidden"}`}
        ref={optionsContainerRef}
      >
        {renderizeOptions()}
      </div>
    </div>
  );
}
