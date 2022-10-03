import * as yup from "yup";

export const dayValidation = yup.array().of(
  yup.object().shape({
    name: yup.string().required(),
    day: yup.string().required(),
    weekId: yup.number().required().integer().strict(),
  })
);

export const dayUpdateValidation = yup.object({
  name: yup.string().nullable(true),
  day: yup.string().nullable(true),
  weekId: yup.number().nullable(true).integer().strict(),
  status: yup.number().nullable(true).integer().strict(),
  content: yup.number().nullable(true).integer().strict(),
  userId: yup.number().nullable(true).integer().strict(),
});
