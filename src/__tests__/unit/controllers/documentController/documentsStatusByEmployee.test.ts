import { Request, Response } from "express"
import { documentsStatusByEmployee } from "../../../../controllers/documentController"
import { STATUS_CODE } from "../../../../constants"
import { documentsStatusByEmployeeService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("documentsStatusByEmployee Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {
      params: {
        employeeId: "60e7bdf9c25e6e4560f6e7b1"
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

  it("Should call documentsStatusByEmployeeService and return 200 with employee documents", async () => {
    const mockDocument = {
      _id: "688a5c3b39415621342c1e9b",
      name: "CNH",
      status: "completed",
      documentTypeId: ["688a4c3b39415621342c1e9a"]
    }
    ;(documentsStatusByEmployeeService as jest.Mock).mockResolvedValue(
      mockDocument
    )
    await documentsStatusByEmployee(mockReq as Request, mockRes as Response)
    expect(documentsStatusByEmployeeService).toHaveBeenCalledWith({
      employeeId: mockReq.params?.employeeId
    })
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.SUCCESS)
    expect(responseObject).toEqual({
      document: mockDocument,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(documentsStatusByEmployeeService as jest.Mock).mockRejectedValue(
      mockError
    )
    ;(handleError as jest.Mock).mockClear()

    await documentsStatusByEmployee(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
