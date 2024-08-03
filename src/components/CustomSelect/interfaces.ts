import { ReactElement } from "react";
import { ReactNode } from "react";
import CustomOption from "../CustomSelect/CustomOption";

export type CustomOptionData = {
  value: string;
  text: string;
};

// This represents the diferent styles that CustomOption or CustomSelect can take
export type CustomizableStyles = {
  base: string;
  selected: string;
  hover: string;
  active: string;
  disabled: string;
};

// This represents the proprs received by the CustomOption element
export interface CustomOptionProps {
  children: ReactNode;
  value: string;
  isDefault?: boolean;
  isDefaultSelected?: boolean;
  isDisabled?: boolean;
  _isSelected?: boolean;
  styles?: CustomizableStyles;
  _onClickCallback?: ({ value, text }: CustomOptionData) => void;
}

// childrens of CustomSelect component can be a single component of type 'CustomOption'
// which implements CustomOptionProps interface, multiple of them or none
export type CustomSelectChildrens =
  | ReactElement<CustomOptionProps, typeof CustomOption>
  | ReactElement<CustomOptionProps, typeof CustomOption>[];

// This represents the props received by the CustomSelect element
export interface CustomSelectProps {
  children: CustomSelectChildrens;
  multiple?: boolean;
  onOptionSelected?: (selectedOptionsValue: Array<CustomOptionData>) => void;
  extraStyles?: string;
}
