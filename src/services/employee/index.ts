import { STATUS_CODE } from "../../constants"
import Employee from "../../models/employee"
import { CustomError } from "../../utils"

interface IEmployeeService {
  props: {
    _id: string
    name: string
    cpf: string
    hiredAt: Date
  }
}

const listAllEmployeeService = async () => {
  const employee = await Employee.find().select("name cpf hiredAt")

  if (employee.length === 0)
    throw new CustomError({
      message:
        "No employee found. Please make sure there are employee registered.",
      statusCode: STATUS_CODE.NOT_FOUND
    })

  return employee
}

const registerEmployeeService = async ({
  props
}: Omit<IEmployeeService, "_id">) => {
  const employee = await Employee.create(props)

  if (!employee) {
    throw new CustomError({
      message:
        "Failed to create employee. Please verify the data and try again.",
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }

  return employee
}

const updateEmployeeService = async ({
  props
}: Omit<IEmployeeService, "hiredAt" | "cpf">) => {
  const employee = await Employee.findOneAndUpdate(
    { _id: props._id },
    { $set: { name: props.name } },
    { new: true }
  ).select("name cpf hiredAt")

  if (!employee) {
    throw new CustomError({
      message: "Employee not found for update",
      statusCode: STATUS_CODE.NOT_FOUND
    })
  }

  return employee
}

export {
  listAllEmployeeService,
  registerEmployeeService,
  updateEmployeeService
}
