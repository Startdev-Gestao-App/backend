import * as yup from "yup";

export const userValidation = yup.object({
  name: yup.string().required().min(4),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  admin: yup.boolean().nullable(true).default(true),
});

export const userUpdateValidation = yup.object({
  name: yup.string().nullable(true).min(4),
  email: yup.string().nullable(true).email(),
  password: yup.string().nullable(true).min(6),
  admin: yup.boolean().nullable(true).default(true),
});
