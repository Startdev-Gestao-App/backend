import * as yup from "yup";

export const weekValidation = yup.array().of(
  yup.object().shape({
    name: yup.string().required(),
    date: yup.string().required(),
    priority: yup.string().required(),
    type: yup.string().required(),
  })
);

export const weekUpdateValidation = yup.object({
  name: yup.string().nullable(true),
  date: yup.string().nullable(true),
  priority: yup.string().nullable(true),
  type: yup.string().nullable(true),
});
