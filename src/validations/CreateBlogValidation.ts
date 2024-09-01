import * as yup from "yup";

export const createBlogSchema = yup.object().shape({
  body: yup.string().required("Este campo no puede estar vacio."),
  relatedProjectId: yup.string().required("Debe seleccionar un proyecto."),
  title: yup.string().required("Este campo no puede estar vacio."),
});
