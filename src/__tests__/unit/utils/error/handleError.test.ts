import { Response } from "express"
import { CustomError, handleError } from "../../../../utils"
import { STATUS_CODE } from "../../../../constants"
import { ValidationError } from "yup"

describe("handleError utils", () => {
  let mockRes: Partial<Response>

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
  })

  it("Should handle a CustomError and return the correct status and message", () => {
    const error = new CustomError({
      message: "Test Error",
      statusCode: STATUS_CODE.BAD_REQUEST
    })

    handleError({ error, res: mockRes as Response })

    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.BAD_REQUEST)
    expect(mockRes.send).toHaveBeenCalledWith({
      success: false,
      error: "Test Error"
    })
  })

  it("Should handle a yup ValidationError and return the list of errors", () => {
    const error = new ValidationError("cpf is required")

    handleError({ error, res: mockRes as Response })

    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.BAD_REQUEST)
    expect(mockRes.send).toHaveBeenCalledWith({
      success: false,
      error: expect.arrayContaining(["cpf is required"])
    })
  })

  it("Should handle an unknown error and return an internal server error", () => {
    const error = new Error("cpf is required")

    handleError({ error, res: mockRes as Response })

    expect(mockRes.status).toHaveBeenCalledWith(
      STATUS_CODE.INTERNAL_SERVER_ERROR
    )
    expect(mockRes.send).toHaveBeenCalledWith({
      success: false,
      error: "An error occurred in our system. Please try again later."
    })
  })
})
