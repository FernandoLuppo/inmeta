import { Router } from "express"
import {
  listAllEmployee,
  registerEmployee,
  updateEmployee
} from "../../controllers/employeeController"

const employeeRouter = Router()

employeeRouter.get("/list-all", listAllEmployee)
employeeRouter.post("/register", registerEmployee)
employeeRouter.patch("/update", updateEmployee)

export { employeeRouter }
