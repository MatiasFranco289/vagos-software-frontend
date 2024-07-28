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
import { CustomSelectProps } from "./interfaces";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";

export default function CustomSelect({
  children,
  multiple: multiple = false,
}: CustomSelectProps) {
  const selectRef = useRef(null); // This is a ref to the select itself
  const optionsContainerRef = useRef(null); // This is a ref to the container with all the options

  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState(false); // This manages the visibility of the CustomOptions container
  const isOptionsMenuOpenRef = useRef(isOptionsMenuOpen); // Reference necessary to keep the value updated in 'toggleOptionsContainerVisibility' function

  const customSelectText = getCustomSelectText(children); // The text showed in the select by default
  const [selectedOptions, setSelectedOptions] = useState<Array<string | null>>(
    getOptionsSelectedByDefault(children)
  ); // This array will save the value of all selected options

  // Event listener with callback function to manage the options menu status
  useEffect(() => {
    validations.forEach((validation) => {
      validation(children, multiple);
    });

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
    <div className="bg-dark-100 p-2 rounded-sm cursor-pointer relative">
      <div
        className="absolute top-0 left-0 w-full h-full z-20"
        ref={selectRef}
      />

      <div className="flex items-center space-x-2">
        <p className="opacity-0 mr-6">{getLongestOption(children)}</p>
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
          handleOptionClicked(selectedOptions, setSelectedOptions, multiple)
        )}
      </div>
    </div>
  );
}
