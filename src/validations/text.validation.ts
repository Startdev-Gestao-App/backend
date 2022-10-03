import * as yup from "yup";

export const textValidation = yup.object({
  text: yup.string().required(),
  dayId: yup.number().required().integer().strict(),
});
