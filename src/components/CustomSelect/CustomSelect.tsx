"use client";
import { useState, useRef, useEffect, ReactElement, ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";
import CustomOption from "./CustomOption";
import React from "react";

type SelectOption = {
  value: string;
  children: string;
  default: boolean;
};

interface CustomSelectProps {
  children: ReactElement<SelectOption> | ReactElement<SelectOption>[];
}

export default function CustomSelect({ children }: CustomSelectProps) {
  const options = Array.isArray(children)
    ? children.map((option) => {
        return {
          value: option.props.value,
          text: option.props.children,
          default: option.props.default || false,
        };
      })
    : {
        value: children.props.value,
        text: children.props.children,
        default: children.props.default || false,
      };

  // TODO: Agregar caso en el que no haya default option
  const defaultOption = Array.isArray(options)
    ? options.find((option) => option.default)
    : options;

  const [isOpen, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(Array<string>);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const renderizeOptions = () => {
    if (Array.isArray(children)) {
      return children.map((option) => {
        return option;
      });
    } else {
      return children;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const changeDropdownState = () => {
    setOpen(!isOpen);
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

  const handleOptionClicked = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    console.log(event);
  };

  return (
    <div className="bg-dark-100 p-2 rounded-sm cursor-pointer relative">
      <div
        className="absolute top-0 left-0 w-full h-full z-20"
        onClick={changeDropdownState}
      />

      <div className="flex items-center space-x-2">
        <p className="opacity-0">{getLongestOption()}</p>
        <p className="absolute left-0">{defaultOption?.text}</p>
        <IoIosArrowDown className="absolute right-[10px]" />
      </div>

      <div
        className={`absolute top-100 left-0 bg-dark-200 z-50 rounded-md mt-2 whitespace-nowrap
        ${isOpen ? "block" : "hidden"}`}
        ref={ref}
      >
        {renderizeOptions()}
      </div>
    </div>
  );
}
