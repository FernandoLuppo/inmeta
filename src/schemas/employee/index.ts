import * as yup from "yup"

const formatCPF = (value: string) => {
  const digits = value.replace(/\D/g, "")
  const validRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
  const cpfTemplate = /(\d{3})(\d{3})(\d{3})(\d{2})/

  if (validRegex.test(value)) {
    return value
  }

  return digits.replace(cpfTemplate, "$1.$2.$3-$4")
}

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
      "Invalid format, CPF must be 00000000000."
    ),

  hiredAt: yup.date().required("hiredAt field is required.")
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
