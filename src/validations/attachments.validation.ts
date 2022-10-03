import * as yup from "yup";

export const attachmentsValidation = yup.object({
  file: yup.string().required(),
  dayId: yup.number().required().integer().strict(),
});
