import { Response } from "express"

import { STATUS_CODE } from "../../constants"
import { ValidationError } from "yup"

interface IHandleError {
  error: unknown | CustomError
  res: Response
}

export class CustomError extends Error {
  statusCode: number

  constructor(params: { message: string; statusCode: number }) {
    super(params.message)
    this.name = "CustomError"
    this.statusCode = params.statusCode
  }
}

export const handleError = ({ error, res }: IHandleError) => {
  console.log(error)
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .send({ success: false, error: error.message })
  }

  if (error instanceof ValidationError) {
    return res.status(STATUS_CODE.BAD_REQUEST).send({
      success: false,
      error: error.errors
    })
  }

  return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({
    success: false,
    error: "An error occurred in our system. Please try again later."
  })
}
