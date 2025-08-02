import { Request, Response } from "express"
import { listAllEmployee } from "../../../../controllers/employeeController"
import { STATUS_CODE } from "../../../../constants"
import { listAllEmployeeService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("listAllEmployee Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {}

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

  it("Should call listAllEmployeeService and return 200 with a list of employee", async () => {
    const mockDocument = [
      {
        _id: "688a482e739415821342c1e4",
        name: "João Silva",
        cpf: "123.456.789-00",
        hiredAt: "2025-07-30T16:28:30.402Z"
      }
    ]

    ;(listAllEmployeeService as jest.Mock).mockResolvedValue(mockDocument)
    await listAllEmployee(mockReq as Request, mockRes as Response)

    expect(listAllEmployeeService).toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.SUCCESS)
    expect(responseObject).toEqual({
      employee: mockDocument,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(listAllEmployeeService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await listAllEmployee(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
