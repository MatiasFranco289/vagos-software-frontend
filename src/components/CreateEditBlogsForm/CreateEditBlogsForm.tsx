import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikProps,
} from "formik";
import { createBlogSchema } from "@/validations/CreateBlogValidation";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CustomOption from "@/components/CustomSelect/CustomOption";
import { CustomOptionData } from "../CustomSelect/interfaces";
import BlogCard from "../BlogCard/BlogCard";
import GlowingButton from "../GlowingButton/GlowingButton";
import { BlogInfo } from "@/interfaces";
import { ApiProject } from "@/apiInterfaces";
import { USERNAME } from "@/constants";

interface CreateEditBlogsForm {
  onFormSend: (formInfo: BlogInfo) => void;
  sendBtnText: string;
  projects: Array<ApiProject>;
  validationSchema: typeof createBlogSchema;
  defaultValues?: BlogInfo;
}

export default function CreateEditBlogsForm({
  onFormSend: onFormSend = (formInfo: BlogInfo) => {},
  sendBtnText,
  projects,
  validationSchema,
  defaultValues: defaultValues = {
    title: "",
    relatedProjectId: "",
    body: "",
  },
}: CreateEditBlogsForm) {
  const today = new Date().toISOString().split("T")[0];

  interface CustomSelectFieldProps extends FieldProps {
    form: FormikProps<any>;
  }
  // This returns a component managed by Formik using the CustomSelect component
  const CustomSelectField = ({ field, form }: CustomSelectFieldProps) => {
    const handleChange = (value: CustomOptionData[]) => {
      if (value[0]) {
        const newValue = value[0].value;
        form.setFieldValue("relatedProjectId", newValue);
      }
    };

    let options: JSX.Element[] = projects.map((project, index) => {
      return (
        <CustomOption
          value={project.id.toString()}
          key={`custom_select_project_${index}`}
        >
          {project.title}
        </CustomOption>
      );
    });

    options.unshift(
      <CustomOption value="" isDefault isDisabled key="custom_select_default">
        Seleccione el proyecto relacionado
      </CustomOption>
    );

    return (
      <CustomSelect onOptionSelected={handleChange}>{options}</CustomSelect>
    );
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onFormSend}
    >
      {({ values }) => {
        return (
          <div>
            <Form className="w-full bg-dark-300 p-6 rounded-md">
              <div className="relative">
                <Field
                  name="title"
                  type="text"
                  placeholder="Titulo del blog"
                  className={`bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none focus:border-green-500 w-full `}
                />

                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-600 absolute bottom-0 text-sm"
                />
                <div className="sm:h-[25px] h-[30px]" />
              </div>

              <div className="mt-3 relative">
                <Field name="relatedProjectId" component={CustomSelectField} />

                <ErrorMessage
                  name="relatedProjectId"
                  component="div"
                  className="text-red-600 absolute bottom-0 text-sm"
                />

                <div className="sm:h-[25px] h-[30px]" />
              </div>

              <div className=" mt-4 relative">
                <Field
                  as="textarea"
                  id="description"
                  name="body"
                  placeholder="Escriba su descripción aquí"
                  className="bg-dark-200 w-full rounded-sm p-1 border-[1px] outline-none focus:border-green-500"
                  rows="10"
                />

                <ErrorMessage
                  name="body"
                  component="div"
                  className="text-red-600 absolute bottom-0 text-sm"
                />

                <div className="sm:h-[25px] h-[30px]" />
              </div>

              <div className="flex justify-center mt-6">
                <div className="w-2/6">
                  <GlowingButton text={sendBtnText} type="submit" />
                </div>
              </div>
            </Form>

            <div className="bg-dark-300 mt-6 p-6 rounded-md">
              <BlogCard
                author={localStorage.getItem(USERNAME) || "VagoDev"}
                date={today}
                title={values.title}
                body={values.body}
              />
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
