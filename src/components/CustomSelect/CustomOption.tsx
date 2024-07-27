"use client";
import { ReactNode } from "react";

interface CustomOptionProps {
  children: ReactNode;
  value: string;
  default?: boolean;
  onClickCallback?: (optionValue?: string, optionText?: string) => void;
  isSelected?: boolean;
  disabled?: boolean;
  defaultSelected?: boolean;
}

// TODO: Agregar comprobacion de que children sea un string
export default function CustomOption({
  children,
  value,
  default: defaultValue = false,
  onClickCallback,
  isSelected,
  disabled,
}: CustomOptionProps) {
  const handleOnClick = () => {
    if (onClickCallback) {
      onClickCallback(value, children?.toString());
    }
  };

  return (
    (!disabled && (
      <p
        className={`p-2 hover:bg-dark-400 rounded-md duration-100 cursor-pointer ${
          isSelected && "text-orange-500 glow-text"
        }`}
        onClick={handleOnClick}
      >
        {children}
      </p>
    )) || (
      <p className="p-2 rounded-md text-gray-500 cursor-default">{children}</p>
    )
  );
}
