import * as yup from "yup"

const documentTypeRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name field is required.")
    .min(3, "Name field must have at least 3 characters.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please insert your document type correctly."
    )
})

export { documentTypeRegisterSchema }
