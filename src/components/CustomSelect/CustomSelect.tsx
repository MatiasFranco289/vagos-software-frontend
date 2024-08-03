"use client";
import { useEffect, useRef, useState } from "react";
import {
  getLongestOption,
  getExtendedCustomOptions,
  toggleOptionsContainerVisibility,
  getCustomSelectText,
  getOptionsSelectedByDefault,
  handleOptionClicked,
  showCustomSelectText,
  validations,
} from "./customSelectUtils";
import { CustomOptionData, CustomSelectProps } from "./interfaces";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";

// This component is a CustomSelect
// It should have CustomOptions component as childs
// If the option 'multiple' it's specified, multiple CustomOptions can be selected at once

// onOptionSelected is an optional callback that will be invoked every time a CustomOption is clicked
// this callback function must have a parameter being Array<string | null> that will be used to pass the
// value of the current selected CustomOption components
export default function CustomSelect({
  children,
  multiple: multiple = false,
  onOptionSelected: onOptionSelected = (
    selectedOptionsValue: Array<CustomOptionData>
  ) => {},
  extraStyles,
}: CustomSelectProps) {
  // I run all the validations before do something
  validations.forEach((validation) => {
    validation(children, multiple);
  });

  const selectRef = useRef(null); // This is a ref to the select itself
  const optionsContainerRef = useRef(null); // This is a ref to the container with all the options

  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState(false); // This manages the visibility of the CustomOptions container
  const isOptionsMenuOpenRef = useRef(isOptionsMenuOpen); // Reference necessary to keep the value updated in 'toggleOptionsContainerVisibility' function

  const customSelectText = getCustomSelectText(children); // The text showed in the select by default
  const [selectedOptions, setSelectedOptions] = useState<
    Array<CustomOptionData>
  >(getOptionsSelectedByDefault(children)); // This array will save the value of all selected options

  // Event listener with callback function to manage the options menu status
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      toggleOptionsContainerVisibility(
        event,
        selectRef,
        optionsContainerRef,
        isOptionsMenuOpenRef,
        setOptionsMenuOpen
      );
    };

    document.addEventListener("mousedown", handleMouseDown);

    // When the component is initializated i use the callback method to informate the actual selecte values
    onOptionSelected(selectedOptions);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Every time the value of 'isOptionsMenuOpen' changes i updated the reference
  useEffect(() => {
    isOptionsMenuOpenRef.current = isOptionsMenuOpen;
  }, [isOptionsMenuOpen]);

  return (
    <div
      className={`bg-dark-100 p-2 rounded-sm cursor-pointer relative ${extraStyles}`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full z-20"
        ref={selectRef}
      />

      <div className="flex items-center space-x-2">
        <p className="opacity-0 mr-6 whitespace-nowrap">
          {getLongestOption(children)}
        </p>
        <p className="absolute left-0">
          {showCustomSelectText(
            customSelectText,
            multiple,
            children,
            selectedOptions
          )}
        </p>
        <IoIosArrowDown className="absolute right-[10px]" />
      </div>

      <div
        className={`absolute top-100 left-0 bg-dark-200 z-50 w-full p-1 rounded-md mt-2 whitespace-nowrap
        ${isOptionsMenuOpen ? "block" : "hidden"}`}
        ref={optionsContainerRef}
      >
        {getExtendedCustomOptions(
          children,
          selectedOptions,
          handleOptionClicked(
            selectedOptions,
            setSelectedOptions,
            multiple,
            onOptionSelected
          )
        )}
      </div>
    </div>
  );
}
