import { Request, Response } from "express"
import { handleError } from "../../utils"
import {
  listAllEmployeeService,
  registerEmployeeService,
  updateService
} from "../../services"
import { STATUS_CODE } from "../../constants"

const listAllEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await listAllEmployeeService()
    return res.status(STATUS_CODE.SUCCESS).send({ employee, success: true })
  } catch (error) {
    handleError({ error, res })
  }
}

const registerEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await registerEmployeeService({ props: req.body })
    return res.status(STATUS_CODE.CREATED).send({ employee, success: true })
  } catch (error) {
    handleError({ error, res })
  }
}

const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await updateService({ props: req.body })
    return res.status(STATUS_CODE.SUCCESS).send({ employee, success: true })
  } catch (error) {
    handleError({ error, res })
  }
}

export { listAllEmployee, registerEmployee, updateEmployee }
