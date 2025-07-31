import { Router } from "express"
import {
  listAllEmployee,
  registerEmployee,
  updateEmployee
} from "../../controllers/employeeController"
import {
  registerEmployeeValidation,
  updateEmployeeValidation
} from "../../middlewares"

const employeeRouter = Router()

employeeRouter.get("/list-all", listAllEmployee)
employeeRouter.post("/register", registerEmployeeValidation, registerEmployee)
employeeRouter.patch("/update", updateEmployeeValidation, updateEmployee)

export { employeeRouter }
