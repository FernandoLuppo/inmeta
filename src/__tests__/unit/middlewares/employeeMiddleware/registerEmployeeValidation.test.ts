import { Request, Response, NextFunction } from "express"
import * as yup from "yup"
import { registerEmployeeValidation } from "../../../../middlewares"
import { handleError } from "../../../../utils"

jest.mock("../../../../schemas", () => ({
  employeeRegisterSchema: {
    validate: jest.fn().mockImplementation(() =>
      Promise.resolve({
        name: "John Doe",
        cpf: "145.246.960-16",
        hiredAt: new Date()
      })
    )
  },
  isValidCPF: jest.fn().mockReturnValue(true),
  formatCPF: jest.fn().mockImplementation(cpf => cpf)
}))

jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

describe("registerEmployeeValidation Middleware", () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockNext: jest.MockedFunction<NextFunction>

  beforeEach(() => {
    mockRequest = {
      body: {
        name: "John Doe",
        cpf: "145.246.960-16",
        hiredAt: "2023-01-01"
      }
    }

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mockNext = jest.fn()

    jest.clearAllMocks()
  })

  it("Should call next() if validation passes", async () => {
    require("../../../../schemas").employeeRegisterSchema.validate.mockResolvedValueOnce(
      mockRequest.body
    )

    await registerEmployeeValidation(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    )

    expect(mockNext).toHaveBeenCalled()
    expect(handleError).not.toHaveBeenCalled()
    expect(mockRequest.body).toEqual({
      name: "John Doe",
      cpf: "145.246.960-16",
      hiredAt: "2023-01-01"
    })
  })

  it("Should call handleError if validation fails", async () => {
    const mockError = new yup.ValidationError("Erro de validação")
    require("../../../../schemas").employeeRegisterSchema.validate.mockRejectedValueOnce(
      mockError
    )

    await registerEmployeeValidation(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    )

    expect(handleError).toHaveBeenCalled()
    expect(mockNext).not.toHaveBeenCalled()
  })
})
