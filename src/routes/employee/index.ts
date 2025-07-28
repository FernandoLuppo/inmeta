import { Router } from "express"
import { register, update } from "../../controllers/employeeController"

const employeeRouter = Router()

employeeRouter.post("/register", register)
employeeRouter.patch("/update", update)

export { employeeRouter }
