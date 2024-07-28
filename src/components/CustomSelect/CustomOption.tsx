"use client";
import {
  CustomOptionProps,
  CustomizableStyles,
} from "@/components/CustomSelect/interfaces";

const defaultStyles: CustomizableStyles = {
  base: "p-2 rounded-md duration-100",
  selected: "text-orange-500 glow-text",
  hover: "hover:bg-dark-400",
  active: "cursor-pointer text-white",
  disabled: "text-gray-500 cursor-default",
};

// This component represents an option
// It is designed ot be used inside CustomSelect component as child of it
// It receives the following parameters:

// children: The text showed in the option, must be passed between tags <CustomOption/>text here<CustomOption>
// value: string containing the value of this option
// isDefault: If setted to true, the text of this option will be showed by default in the CustomSelect but this not means the option will be selected
// isDefaultSelected: If setted to true this option will be selected by default
// isDisabled: If setted to true this option will be disabled and could not be selected
// styles: You can pass custom styles here by following the interface 'CustomizableStyles'

// props starting with _ are only for internal use
export default function CustomSelect({
  children,
  value: value = "",
  isDefault: isDefault = false,
  isDefaultSelected: isDefaultSelected = false,
  isDisabled: isDisabled = false,
  _isSelected: isSelected = false,
  _onClickCallback,
  styles: styles = defaultStyles,
}: CustomOptionProps) {
  const handleOnClick = () => {
    if (_onClickCallback) {
      _onClickCallback(value);
    }
  };

  if (isDisabled && isDefaultSelected) {
    throw new Error("Disabled options cannot be default selected");
  }

  return (
    (!isDisabled && (
      <p
        className={`${styles.base} ${styles.hover} ${styles.active} ${
          isSelected && styles.selected
        }`}
        onClick={handleOnClick}
      >
        {children}
      </p>
    )) || <p className={`${styles.base} ${styles.disabled}`}>{children}</p>
  );
}
