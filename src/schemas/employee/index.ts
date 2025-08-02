import * as yup from "yup"
import { formatCPF, isValidCPF } from "../../utils"

const employeeRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name field is required.")
    .min(3, "Name field must have at least 3 characters.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please insert your name correctly."
    ),

  cpf: yup
    .string()
    .required("CPF field is required.")
    .transform(value => formatCPF(value))
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "Invalid format, CPF must be 000.000.000-00."
    )
    .test("is-valid-cpf", "Invalid CPF number.", value => {
      if (!value) return false
      return isValidCPF(value)
    }),

  hiredAt: yup.date().required("HiredAt field is required.")
})

const employeeUpdateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name field is required.")
    .min(3, "Name field must have at least 3 characters.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please insert your name correctly."
    ),

  _id: yup
    .string()
    .required("_id field is required.")
    .matches(
      /^[a-f\d]{24}$/i,
      "Invalid format: _id must be a valid ObjectId (24 hex characters)."
    )
})

export { employeeRegisterSchema, employeeUpdateSchema }
