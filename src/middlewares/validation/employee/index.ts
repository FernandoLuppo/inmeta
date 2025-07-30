import { NextFunction, Request, Response } from "express"
import { employeeRegisterSchema, employeeUpdateSchema } from "../../../schemas"
import { handleError } from "../../../utils"

const registerEmployeeValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedBody = await employeeRegisterSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })
    req.body = validatedBody
    return next()
  } catch (error) {
    handleError({ error, res })
  }
}

const updateEmployeeValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await employeeUpdateSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })
    return next()
  } catch (error) {
    handleError({ error, res })
  }
}

export { registerEmployeeValidation, updateEmployeeValidation }
