import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
  title: yup.string().required("Este campo no puede estar vacio."),
  description: yup.string().required("Este campo no puede estar vacio."),
  thumbnail_url: yup
    .string()
    .required("Este campo no puede estar vacio.")
    .url("Este campo debe ser una URL valida."),
  start_date: yup.date().required("Este campo no puede estar vacio."),
  end_date: yup.date(),
  expected_end_date: yup.date(),
  status_id: yup
    .number()
    .required("Debes seleccionar un estado.")
    .notOneOf([0], "Debes seleccionar un estado."),
  repository_url: yup
    .string()
    .required("Este campo no puede estar vacio.")
    .url("Este campo debe ser una URL valida."),
  tags_id: yup.array().required().min(1, "Debes seleccionar al menos un tag."),
  creator_id: yup.number().required("Este campo no puede estar vacio."),
});
