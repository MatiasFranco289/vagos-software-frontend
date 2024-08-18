import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
  title: yup.string().required("Este campo no puede estar vacio."),
  resources_urls: yup.array().of(yup.string().optional().url("URL invalida.")),
  resource_type: yup.number().required(),
});
