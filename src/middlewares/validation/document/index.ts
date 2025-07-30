import { NextFunction, Request, Response } from "express"
import { handleError } from "../../../utils"
import { linkDocumentSchema, listAllPendingSchema } from "../../../schemas"

const linkDocumentValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await linkDocumentSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })
    return next()
  } catch (error) {
    handleError({ error, res })
  }
}

const listAllPendingValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await listAllPendingSchema.validate(req.body, {
      abortEarly: false
    })
    return next()
  } catch (error) {
    handleError({ error, res })
  }
}

export { linkDocumentValidation, listAllPendingValidation }
