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

export default function CustomSelect({
  children,
  value: value = "",
  isDefault: isDefault = false,
  isDefaultSelected: isDefaultSelected = false,
  isDisabled: isDisabled = false,
  isSelected: isSelected = false,
  onClickCallback,
  styles: styles = defaultStyles,
}: CustomOptionProps) {
  const handleOnClick = () => {
    if (onClickCallback) {
      onClickCallback(value);
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
