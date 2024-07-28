import { CustomOptionProps, CustomSelectChildrens } from "./interfaces";
import React from "react";

export const validations = [
  (options: CustomSelectChildrens, _isMultiple: boolean) => {
    if (!options) {
      throw new Error(
        `CustomSelect component must have at least one CustomOption component as child`
      );
    }

    return true;
  },
  (options: CustomSelectChildrens, _isMultiple: boolean) => {
    if (!Array.isArray(options)) return true;

    const optionsWithIsDefaultTrue = options.filter(
      (option) => option.props.isDefault
    );

    if (optionsWithIsDefaultTrue.length > 1) {
      throw new Error(`Only one option can have 'isDefault' being true.`);
    }

    return true;
  },
  (options: CustomSelectChildrens, isMultiple: boolean) => {
    if (isMultiple) return true;
    if (!Array.isArray(options)) return true;

    const optionsWithIsDefaultSelected = options.filter(
      (option) => option.props.isDefaultSelected
    );

    if (optionsWithIsDefaultSelected.length > 1) {
      throw new Error(`When 'multiple' is not setted to true, only one CustomOption can have the attribute
        'isDefaultSelected' being true`);
    }

    return true;
  },
  (options: CustomSelectChildrens, _isMultiple: boolean) => {
    if (!Array.isArray(options)) return true;

    const valueSet = new Set<string>();

    for (const index in options) {
      if (valueSet.has(options[index].props.value)) {
        throw new Error("CustomOptions cannot have duplicated values");
      }
      valueSet.add(options[index].props.value);
    }

    return true;
  },
];

// This function iterates over all CustomOption childs of CustomSelect component
// and return the CustomOption with the longest text
export const getLongestOption = (options: CustomSelectChildrens) => {
  let longestOption: CustomSelectChildrens;

  // If there are multiple CustomOption components in the CustomSelect
  if (Array.isArray(options)) {
    longestOption = options.reduce((longest, current) => {
      let longestText = longest.props.children?.toString() || "";
      let currentText = current.props.children?.toString() || "";

      return currentText.length > longestText.length ? current : longest;
    }, options[0]);
  } else {
    // Only one CustomOption in the CustomSelect component
    longestOption = options;
  }

  return longestOption.props.children?.toString() || "";
};

// This function clone the children CustomOption components of the CustomSelect
// and returns a list of CustomOption components or a single one, with extra props setted
export const getExtendedCustomOptions = (
  options: CustomSelectChildrens,
  selectedOptions: Array<string | null>,
  onOptionClicked: (value: string) => void
) => {
  // If there are multiple CustomOptions in the CustomSelect
  if (Array.isArray(options)) {
    return options.map((option, index) => {
      return React.cloneElement(
        option as React.ReactElement<CustomOptionProps>,
        {
          ...option.props,
          key: `custom_option_${index}`,
          _isSelected: selectedOptions.includes(option.props.value),
          _onClickCallback: onOptionClicked,
        }
      );
    });
  } else {
    // If there are only one CustomOption in the CustomSelect
    return React.cloneElement(
      options as React.ReactElement<CustomOptionProps>,
      {
        ...options.props,
        key: `custom_option_1`,
        _isSelected: selectedOptions.includes(options.props.value),
        _onClickCallback: onOptionClicked,
      }
    );
  }
};

// When you click in the CustomSelect component this component handles
// when the option list should be opened or closed
export const toggleOptionsContainerVisibility = (
  event: MouseEvent,
  selectRef: React.RefObject<HTMLDivElement>,
  optionsContainerRef: React.RefObject<HTMLDivElement>,
  isOptionsMenuOpenRef: React.MutableRefObject<boolean>,
  setOptionsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // If you touch the select and the options menu is closed
  if (
    !isOptionsMenuOpenRef.current &&
    selectRef.current?.contains(event.target as Node)
  ) {
    setOptionsMenuOpen(true);
  }
  // If you touch outside the options container and the options menu is open
  else if (
    isOptionsMenuOpenRef.current &&
    !optionsContainerRef.current?.contains(event.target as Node)
  ) {
    setOptionsMenuOpen(false);
  }
};

// The text showed by default in the CustomSelect component should be
// the text of the CustomOption component with 'isDefault' being true or if there are
// no options with 'isDefault' in true then, the text of the first option
// If there are only one option its text will be retrieved
export const getCustomSelectText = (options: CustomSelectChildrens) => {
  // If there are multiple CustomOptions
  if (Array.isArray(options)) {
    let defaultOption = options.filter((option) => option.props.isDefault);

    return defaultOption.length
      ? defaultOption[0].props.children?.toString() || ""
      : options[0].props.children?.toString() || "";
  }
  // If there are only one CustomOption i return its text
  else {
    return options.props.children?.toString() || "";
  }
};

// Iterates over all CustomOptions in the CustomSelect and retrieves all the options values
// with 'isDefaultSelected' being true. If there are no matches it returns an empty array
export const getOptionsSelectedByDefault = (options: CustomSelectChildrens) => {
  let defaultSelectedOptions: Array<string | null> = [];

  // If the are multiple CustomOptions
  if (Array.isArray(options)) {
    defaultSelectedOptions = options
      .filter((option) => option.props.isDefaultSelected)
      .map((defaultSelectedOption) => {
        return defaultSelectedOption.props.value;
      });
  } else {
    if (options.props.isDefaultSelected) {
      defaultSelectedOptions = [options.props.value];
    }
  }

  return defaultSelectedOptions;
};

// This function handle what happens when you click a CustomOption component
// It will add the value of the CustomSelect to the array of selectedOptions if it not exists
// If the value already exist in the array it will be removed
export const handleOptionClicked =
  (
    selectedOptions: Array<string | null>,
    setSelectedOptions: React.Dispatch<React.SetStateAction<(string | null)[]>>,
    isMultiple: boolean,
    onOptionClickedCallback: (selectedOptionValue: Array<string | null>) => void
  ) =>
  (value: string) => {
    const indexOfNewValue = selectedOptions.indexOf(value);
    let selectedOptionsDuplicate = selectedOptions;

    // If the value of the new selected CustomOption already is in the selectedOptions array it is removed
    if (indexOfNewValue !== -1) {
      selectedOptionsDuplicate.splice(indexOfNewValue, 1);
    } else {
      // The new value is added
      if (isMultiple) {
        selectedOptionsDuplicate.push(value);
      } else {
        selectedOptionsDuplicate = [value];
      }
    }

    onOptionClickedCallback(selectedOptionsDuplicate);
    setSelectedOptions([...selectedOptionsDuplicate]);
  };

// This function return the text that will be showed in the select.
// If the select is of type multiple it will always show the text of the CustomOption
// marked as 'isDefault' or if there are no CustomOption marked, it will show the first option text
// If the select is not of type multiple it will show the text of the CustomOption having the same value
// of the first element in selectedOptions (It should have only 1 element because it is not multiple).
export const showCustomSelectText = (
  customSelectText: string,
  isMultiple: boolean,
  options: CustomSelectChildrens,
  selectedOptions: Array<string | null>
) => {
  // CustomSelect of type multiple only show the default text
  if (isMultiple) return customSelectText;

  let text: string = "";

  if (Array.isArray(options)) {
    text =
      options
        .find((options) => options.props.value == selectedOptions[0])
        ?.props.children?.toString() || customSelectText;
  } else {
    text = options.props.children?.toLocaleString() || "";
  }

  return text;
};
