import { Formik, Form, FormikErrors } from "formik";
import { ApiProject, ApiProjectStatus, ApiProjectTag } from "@/apiInterfaces";
import { createProjectSchema } from "@/validations/CreateProjectValidations";
import GlowingButton from "../GlowingButton/GlowingButton";
import {
  DefaultField,
  DateField,
  CustomSelectField,
  AreaField,
} from "../utils/FormInputs";
import { ID } from "@/constants";

interface ProjectsFormProps {
  projectTags: Array<ApiProjectTag>;
  projectStates: Array<ApiProjectStatus>;
  validationSchema: typeof createProjectSchema;
  initialValues?: Omit<ApiProject, "id">;
  onSubmit?: (formValues: Omit<ApiProject, "id">) => void;
  onCancel?: () => void;
}

export default function ProjectsForm({
  projectTags,
  projectStates,
  initialValues: initialValues = {
    title: "",
    description: "",
    thumbnail_url: "",
    start_date: "",
    end_date: "",
    expected_end_date: "",
    status_id: 0,
    repository_url: "",
    tags_id: [],
    creator_id: parseInt(localStorage.getItem(ID) || "0"),
  },
  validationSchema,
  onSubmit: onSubmit = (_formValues: Omit<ApiProject, "id">) => {},
  onCancel: onCancel = () => {},
}: ProjectsFormProps) {
  // This function is called when the send button is pressed
  // if there are errors in the form, it will scroll to the page start
  const checkErrors = (errors: FormikErrors<Omit<ApiProject, "id">>) => {
    if (Object.keys(errors).length) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, errors }) => {
        return (
          <Form className="w-full bg-dark-300 sm:p-10 p-4 rounded-md mb-28 sm:mb-12">
            <div className="grid gap-10 md:grid-cols-2 mt-6">
              {DefaultField("Hyper triangle", "Titulo del proyecto", "title")}

              {DefaultField(
                "https://drive.google.com/uc?id=1aBcDeFGHiJKlMnOpQrsTUvWXYZ123456",
                "Url de la miniatura",
                "thumbnail_url"
              )}

              {DefaultField(
                "https://github.com/MatiasFranco289/vagos-software-frontend",
                "Url del repositorio",
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

            <div className="mt-2">
              {AreaField("Resumen del proyecto", "Descripcion", "description")}
            </div>

            <div className="w-full flex justify-end mt-6 flex-wrap sm:flex-row flex-col items-center">
              <div className="w-2/12 flex justify-center min-w-32 my-2">
                <GlowingButton
                  text="Crear"
                  type="submit"
                  onClick={() => checkErrors(errors)}
                />
              </div>

              <div className="w-1/12  flex justify-center min-w-32 my-2">
                <GlowingButton
                  text="Cancelar"
                  type="button"
                  onClick={onCancel}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
