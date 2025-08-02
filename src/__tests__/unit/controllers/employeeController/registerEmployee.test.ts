import { Request, Response } from "express"
import { registerEmployee } from "../../../../controllers/employeeController"
import { STATUS_CODE } from "../../../../constants"
import { registerEmployeeService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("registerEmployee Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {
      body: {
        name: "João da Silva",
        cpf: "145.246.960-16",
        hiredAt: "2025-07-30T13:26:33.000Z"
      }
    }

    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockImplementation(result => {
        responseObject = result
        return mockRes
      })
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Should call registerEmployeeService and return 201 with employee infos", async () => {
    const mockDocument = {
      props: {
        name: mockReq.body.name,
        cpf: mockReq.body.cpf,
        hiredAt: mockReq.body.hiredAt,
        _id: "688a482e739415821342c1e4",
        createdAt: "2025-08-01T01:21:37.465Z",
        updatedAt: "2025-08-01T01:21:37.465Z"
      }
    }

    ;(registerEmployeeService as jest.Mock).mockResolvedValue(mockDocument)
    await registerEmployee(mockReq as Request, mockRes as Response)

    expect(registerEmployeeService).toHaveBeenCalledWith({
      props: {
        name: mockDocument.props.name,
        cpf: mockReq.body.cpf,
        hiredAt: mockReq.body.hiredAt
      }
    })
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.CREATED)
    expect(responseObject).toEqual({
      employee: mockDocument,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(registerEmployeeService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await registerEmployee(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
