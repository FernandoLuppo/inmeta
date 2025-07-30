import { NextFunction, Request, Response } from "express"
import { handleError } from "../../../utils"
import { documentTypeRegisterSchema } from "../../../schemas"

const documentTypeRegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await documentTypeRegisterSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })
    return next()
  } catch (error) {
    handleError({ error, res })
  }
}

export { documentTypeRegisterValidation }
