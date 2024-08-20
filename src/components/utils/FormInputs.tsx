// This file contains inputs of different types for Formik forms
import { Field, ErrorMessage, FormikErrors } from "formik";
import { CustomOptionData } from "../CustomSelect/interfaces";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomOption from "../CustomSelect/CustomOption";

export const DefaultField = (
  placeholder: string,
  label: string,
  name: string
) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>

      <Field
        name={name}
        type="text"
        placeholder={placeholder}
        className={`bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none focus:border-green-500 w-full mt-1`}
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 absolute bottom-0 text-sm whitespace-nowrap"
      />
      <div className="sm:h-[25px] h-[30px]" />
    </div>
  );
};

export const AreaField = (placeholder: string, label: string, name: string) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>

      <Field
        as="textarea"
        name={name}
        placeholder={placeholder}
        className="bg-dark-200 w-full rounded-sm p-1 border-[1px] outline-none focus:border-green-500 mt-1"
        rows="10"
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 absolute bottom-0 text-sm whitespace-nowrap"
      />
      <div className="sm:h-[25px] h-[30px]" />
    </div>
  );
};

export const DateField = (label: string, name: string) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>

      <Field
        name={name}
        type="date"
        className="bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none focus:border-green-500 w-full mt-1"
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 absolute bottom-0 text-sm whitespace-nowrap"
      />
      <div className="sm:h-[25px] h-[30px]" />
    </div>
  );
};

export const CustomSelectField = (
  options: Array<{ value: string; name: string }>,
  defaultOption: { value: string; name: string },
  label: string,
  name: string,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<{}>>,
  multiple: boolean
) => {
  const handleChange = (selectedValues: Array<CustomOptionData>) => {
    const selectedValuesId = selectedValues.map((value) => {
      try {
        return parseInt(value.value);
      } catch (err) {
        return value.value;
      }
    });

    setFieldValue(name, multiple ? selectedValuesId : selectedValuesId[0] || 0);
  };

  const optionsToRender = options.map((option, index) => {
    return (
      <CustomOption value={option.value} key={`custom_option_${index}`}>
        {option.name}
      </CustomOption>
    );
  });

  optionsToRender.unshift(
    <CustomOption
      value={defaultOption.value}
      isDefault
      isDisabled
      key={"default_custom_option"}
    >
      {defaultOption.name}
    </CustomOption>
  );

  return (
    <div className="relative">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>

      <div className="mt-1">
        <CustomSelect onOptionSelected={handleChange} multiple={multiple}>
          {optionsToRender}
        </CustomSelect>
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 absolute bottom-0 text-sm whitespace-nowrap"
      />
      <div className="sm:h-[25px] h-[30px]" />
    </div>
  );
};

/* const ResourceField = (values: any, errors: any, touched: any) => {
    return (
      <FieldArray name="resources_urls">
        {({ push, remove }) => (
          <div>
            {values.resources_urls.map((resource: string, index: any) => (
              <div key={index} className="flex justify-between">
                <div className="w-4/6">
                  {DefaultField("www.drive.com", "", `resources_urls.${index}`)}
                </div>

                <div className="flex w-1/6 space-x-6">
                  <GlowingButton
                    type="button"
                    onClick={() => remove(index)}
                    text="Eliminar"
                  />

                  <GlowingButton
                    type="button"
                    text="Agregar"
                    onClick={() => {
                      if (
                        !errors.resources_urls ||
                        !errors.resources_urls[index] ||
                        !touched.resources_urls[index]
                      ) {
                        push("");
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    );
  }; */
