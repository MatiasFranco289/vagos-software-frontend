import * as yup from "yup";

export const loginSchema = yup.object().shape({
  password: yup.string().required("Este campo no puede estar vacio."),
  username: yup.string().required("Este campo no puede estar vacio."),
});
