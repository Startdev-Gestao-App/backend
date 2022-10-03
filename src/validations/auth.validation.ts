import * as yup from "yup";

export const authValidation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});
