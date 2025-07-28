import { Request, Response } from "express"
import { handleError } from "../../utils"
import { registerEmployeeService, updateService } from "../../services"

const register = (req: Request, res: Response) => {
  try {
    const {} = registerEmployeeService()
  } catch (error) {
    handleError({ error, res })
  }
}
const update = (req: Request, res: Response) => {
  try {
    const {} = updateService()
  } catch (error) {
    handleError({ error, res })
  }
}

export { register, update }
