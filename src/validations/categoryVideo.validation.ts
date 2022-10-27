import * as yup from "yup";

export const categoryVideoValidation = yup.object({
  name: yup.string().required(),
});
