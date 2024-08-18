import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FieldArray,
} from "formik";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomOption from "../CustomSelect/CustomOption";
import {
  ApiProject,
  ApiProjectStatus,
  ApiProjectTag,
  ApiResource,
  ApiResourceType,
} from "@/apiInterfaces";
import { CustomOptionData } from "../CustomSelect/interfaces";
import { createProjectSchema } from "@/validations/CreateProjectValidations";
import GlowingButton from "../GlowingButton/GlowingButton";
import axiosInstance from "@/axios";
import { getEnvironmentVariable } from "@/utils";
import { ID, POST_PROJECT_RESOURCE_API_URL } from "@/constants";
import { useState } from "react";

interface ExtendedApiProject extends ApiProject {
  resources_urls: Array<string>;
  resource_type: number;
}

interface ProjectsFormProps {
  projectTags: Array<ApiProjectTag>;
  projectStates: Array<ApiProjectStatus>;
  resourceTypes: Array<ApiResourceType>;
  initialValues: ExtendedApiProject;
}

export default function ProjectsForm({
  projectTags,
  projectStates,
  resourceTypes,
  initialValues: initialValues = {
    id: 0,
    title: "",
    description: "",
    thumbnail_url: "",
    start_date: "",
    end_date: "",
    expected_end_date: "",
    status_id: 0,
    repository_url: "",
    tags_id: [],
    creator_id: 0,
    resources_urls: [""],
    resource_type: 1,
  },
}: ProjectsFormProps) {
  const [resourcesToCreate, setResourcesToCreate] = useState<
    Array<Partial<ApiResource>>
  >([]);

  // TODO: Eliminar los campos inecesarios
  // TODO: Cambiar los any por tipos
  const handleAddResource = async (
    values: any,
    validateField: any,
    errors: any,
    setFieldError: any,
    setFieldTouched: any,
    setFieldValue: any,
    index: number
  ) => {
    // Set field touched to show error message
    setFieldTouched(`resources_urls.${index}`);

    console.log(errors);
    // If there are no errors
    if (!errors["resources_url"]) {
      const url: string = values["resources_url"];
      const typeId: number = values["resource_type"];

      let resourceToCreateAux = resourcesToCreate;
      resourceToCreateAux.push({
        url: url,
        type_id: typeId,
        project_id: 0, // This will be setted once the project is created
      });

      setFieldValue("resources_url", "");
    }
  };

  // TODO: inferir tipos a esto
  const handleResourceTypeChange = (
    setFieldValue: any,
    selectedValues: Array<CustomOptionData>
  ) => {
    if (selectedValues.length) {
      setFieldValue("resource_type", selectedValues[0].value);
    }
  };

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

  const AreaField = (placeholder: string, label: string, name: string) => {
    return (
      <div className="relative">
        <label htmlFor={name} className="font-semibold">
          {label}
        </label>

        <Field
          as="textarea"
          id="description"
          name="body"
          placeholder="Escriba su descripción aquí"
          className="bg-dark-200 w-full rounded-sm p-1 border-[1px] outline-none focus:border-green-500 mt-1"
          rows="10"
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

  // TODO: Eliminar variables inecesarias
  // TODO: inferir tipos correctamente
  const ResourceField = (values: any, errors: any, touched: any) => {
    // TODO: Eliminar any
    // TODO: Si no hay recursos se deberia renderizar los botones igual
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
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createProjectSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        setFieldValue,
        validateField,
        errors,
        setFieldError,
        setFieldTouched,
        touched,
      }) => {
        return (
          <Form className="w-full bg-dark-300 p-6 rounded-md">
            <div className="grid gap-10 md:grid-cols-2 mt-6">
              {DefaultField("Hyper triangle", "Titulo del proyecto", "title")}

              {DefaultField(
                "https://drive.google.com/uc?id=1aBcDeFGHiJKlMnOpQrsTUvWXYZ123456",
                "Url de la miniatura",
                "thumbnail_url"
              )}

              {DefaultField(
                "https://github.com/MatiasFranco289/vagos-software-frontend",
                "Url de la miniatura",
                "repository_url"
              )}

              {DateField("Fecha de inicio", "start_date")}

              {DateField("Fecha de finalización", "end_date")}

              {DateField("Fecha de finalización estimada", "expected_end_date")}

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
                "tags_id",
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
                "status_id",
                setFieldValue,
                false
              )}
            </div>

            <div>
              {AreaField("Resumen del proyecto", "Descripcion", "description")}
            </div>

            <div>
              <label htmlFor="">Recursos</label>

              {ResourceField(values, errors, touched)}
            </div>

            <GlowingButton text="enviar" type="submit" />
          </Form>
        );
      }}
    </Formik>
  );
}
