import * as yup from "yup"

const linkDocumentSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name field is required.")
    .min(3, "Name field must have at least 3 characters.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please insert your name correctly."
    ),

  status: yup
    .string()
    .required("Status field is required.")
    .oneOf(
      ["pending", "completed"],
      "Status must be either 'pending' or 'completed'."
    ),
  employeeId: yup
    .string()
    .required("EmployeeId field is required.")
    .matches(
      /^[a-f\d]{24}$/i,
      "Invalid format: employeeId must be a valid ObjectId (24 hex characters)."
    ),
  documentTypeId: yup
    .array()
    .of(
      yup
        .string()
        .matches(
          /^[a-f\d]{24}$/i,
          "Each documentTypeId  must be a valid ObjectId (24 hex characters)."
        )
        .required("Each documentTypeId is required.")
    )
    .required("DocumentTypeId field is required.")
    .min(1, "The documentTypeId array must contain at least one item.")
})

const sendDocumentSchema = yup.object().shape({
  documentName: yup
    .string()
    .required("Document Name field is required.")
    .min(3, "Document Name field must have at least 3 characters.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please insert your document Name correctly."
    ),
  employeeId: yup
    .string()
    .required("EmployeeId field is required.")
    .matches(
      /^[a-f\d]{24}$/i,
      "Invalid format: employeeId must be a valid ObjectId (24 hex characters)."
    ),
  documentId: yup
    .string()
    .required("DocumentId field is required.")
    .min(1, "The documentId array must contain at least one item.")
    .matches(
      /^[a-f\d]{24}$/i,
      "Each documentId must be a valid ObjectId (24 hex characters)."
    )
})

const listAllPendingSchema = yup.object().shape({
  limit: yup
    .number()
    .required("Limit field is required.")
    .positive("Limit must be a positive number.")
    .integer("Limit must be an integer.")
    .max(50, "Limit must be at most 50."),
  page: yup
    .number()
    .required("Page field is required.")
    .positive("Page must be a positive number.")
    .integer("Page must be an integer.")
})

export { linkDocumentSchema, sendDocumentSchema, listAllPendingSchema }
