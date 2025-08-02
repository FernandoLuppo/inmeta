import { Request, Response } from "express"
import { updateEmployee } from "../../../../controllers/employeeController"
import { STATUS_CODE } from "../../../../constants"
import { updateEmployeeService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("updateEmployee Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {
      body: {
        name: "João da Silva",
        _id: "688a482e739415821342c1e4"
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

  it("Should call updateEmployeeService and return 200 with employee infos", async () => {
    const mockDocument = {
      props: {
        name: mockReq.body.name,
        _id: mockReq.body._id
      }
    }

    ;(updateEmployeeService as jest.Mock).mockResolvedValue(mockDocument)
    await updateEmployee(mockReq as Request, mockRes as Response)

    expect(updateEmployeeService).toHaveBeenCalledWith({
      props: {
        name: mockReq.body.name,
        _id: mockReq.body._id
      }
    })
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.SUCCESS)
    expect(responseObject).toEqual({
      employee: mockDocument,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(updateEmployeeService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await updateEmployee(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
