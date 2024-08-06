"use client";
import { Formik, Form, Field } from "formik";
import BlogCard from "@/components/BlogCard/BlogCard";
import GlowingButton from "@/components/GlowingButton/GlowingButton";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CustomOption from "@/components/CustomSelect/CustomOption";
import { FieldProps, FormikProps, ErrorMessage } from "formik";
import { CustomOptionData } from "@/components/CustomSelect/interfaces";
import { createBlogSchema } from "@/validations/CreateBlogValidation";

export default function CreateBlog() {
  interface CustomSelectFieldProps extends FieldProps {
    form: FormikProps<any>;
  }

  // This returns a component managed by Formik using the CustomSelect component
  const CustomSelectField = ({ field, form }: CustomSelectFieldProps) => {
    const handleChange = (value: CustomOptionData[]) => {
      form.setFieldValue(field.name, (value.length && value[0].value) || "");
    };

    return (
      <CustomSelect onOptionSelected={handleChange}>
        <CustomOption value="" isDefault isDisabled>
          Seleccione el proyecto relacionado
        </CustomOption>
        <CustomOption value="project1">Project 1</CustomOption>
        <CustomOption value="project2">Project 2</CustomOption>
      </CustomSelect>
    );
  };

  const onFormSend = () => {
    // TODO: Call the endpoint for blog creation here
    console.log("Create blog");
  };

  return (
    <div className="w-full min-h-screen mt-24 flex justify-center">
      <div className="flex flex-col w-4/6">
        <h1 className="text-2xl font-light mb-6">{"Admin > Crear blog"}</h1>
        <Formik
          initialValues={{
            title: "",
            body: "",
            relatedProject: "",
          }}
          validationSchema={createBlogSchema}
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
                    <Field
                      name="relatedProject"
                      component={CustomSelectField}
                    />

                    <ErrorMessage
                      name="relatedProject"
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
                      <GlowingButton text="Crear" type="submit" />
                    </div>
                  </div>
                </Form>

                <div className="bg-dark-300 mt-6 p-6 rounded-md">
                  <BlogCard
                    author="VagoDev01"
                    date="05/08/2024"
                    title={values.title}
                    body={values.body}
                  />
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
