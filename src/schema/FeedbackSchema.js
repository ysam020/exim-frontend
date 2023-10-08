import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string("Enter title").required("Please enter a title"),
  description: yup
    .string("Enter a description")
    .required("Description is required"),
});
