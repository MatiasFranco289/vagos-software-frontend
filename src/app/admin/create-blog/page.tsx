"use client";
import { Formik, Form, Field } from "formik";
import BlogCard from "@/components/BlogCard/BlogCard";
import GlowingButton from "@/components/GlowingButton/GlowingButton";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CustomOption from "@/components/CustomSelect/CustomOption";
import { FieldProps, FormikProps, ErrorMessage } from "formik";
import { CustomOptionData } from "@/components/CustomSelect/interfaces";
import { createBlogSchema } from "@/validations/CreateBlogValidation";
import CreateEditBlogsForm from "@/components/CreateEditBlogsForm/CreateEditBlogsForm";

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
        <CreateEditBlogsForm onFormSend={onFormSend} sendBtnText="Crear" />
      </div>
    </div>
  );
}
