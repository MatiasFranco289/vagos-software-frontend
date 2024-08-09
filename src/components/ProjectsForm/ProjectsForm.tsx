import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomOption from "../CustomSelect/CustomOption";
import { ApiProjectState, ApiProjectTag } from "@/apiInterfaces";
import { CustomOptionData } from "../CustomSelect/interfaces";

//!stateId: state_id,
//!creatorId: creator_id,
//!startDate: project_start_date,
//!endDate: project_end_date,
//!name: project_name,
//!image: project_image,
//content: project_content, */

// TODO: Add default values to Formik
// TODO: Add body field
// TODO: Add repo field
// TODO: Add repo and tags to create project endpoint in back

interface ProjectsFormProps {
  projectTags: Array<ApiProjectTag>;
  projectStates: Array<ApiProjectState>;
}

export default function ProjectsForm({
  projectTags,
  projectStates,
}: ProjectsFormProps) {
  const DefaultField = (placeholder: string, label: string, name: string) => {
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
          className="text-red-600 absolute bottom-0 text-sm"
        />
        <div className="sm:h-[25px] h-[30px]" />
      </div>
    );
  };

  const DateField = (label: string, name: string) => {
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
          className="text-red-600 absolute bottom-0 text-sm"
        />
        <div className="sm:h-[25px] h-[30px]" />
      </div>
    );
  };

  const CustomSelectField = (
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
        return value.value;
      });

      setFieldValue(name, selectedValuesId);
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
      <div>
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
          className="text-red-600 absolute bottom-0 text-sm"
        />
        <div className="sm:h-[25px] h-[30px]" />
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        projectTags: [],
      }}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="w-full bg-dark-300 p-6 rounded-md">
            <div className="grid gap-10 md:grid-cols-2 mt-6">
              {DefaultField(
                "Hyper triangle",
                "Titulo del proyecto",
                "projectTitle"
              )}

              {DefaultField(
                "https://drive.google.com/uc?id=1aBcDeFGHiJKlMnOpQrsTUvWXYZ123456",
                "Url de la miniatura",
                "project_thumbnail_url"
              )}

              {DateField("Fecha de inicio", "startDate")}

              {DateField("Fecha de finalización", "endDate")}

              {CustomSelectField(
                projectTags.map((tag) => {
                  return {
                    value: tag.id.toString(),
                    name: tag.name,
                  };
                }),
                {
                  value: "",
                  name: "Tags del proyecto",
                },
                "Tags",
                "projectTags",
                setFieldValue,
                true
              )}

              {CustomSelectField(
                projectStates.map((state) => {
                  return {
                    value: state.id.toString(),
                    name: state.name,
                  };
                }),
                {
                  value: "",
                  name: "Estado del proyecto",
                },
                "Estado",
                "projectState",
                setFieldValue,
                false
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
