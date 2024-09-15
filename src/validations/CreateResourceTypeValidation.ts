import * as yup from "yup";

export const createResourceTypeSchema = yup.object().shape({
  name: yup.string().required("Este campo no puede estar vacio."),
});
