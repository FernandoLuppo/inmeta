import { Request, Response } from "express"
import { listAllDocumentType } from "../../../../controllers/documentTypeController"
import { STATUS_CODE } from "../../../../constants"
import { listAllDocumentTypeService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("listAllDocumentType Controller", () => {
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

  it("Should call listAllDocumentTypeService and return 200 with a list of document type", async () => {
    const mockDocument = [
      {
        _id: "688a482e739415821342c1e4",
        name: "Personal documents"
      }
    ]

    ;(listAllDocumentTypeService as jest.Mock).mockResolvedValue(mockDocument)
    await listAllDocumentType(mockReq as Request, mockRes as Response)

    expect(listAllDocumentTypeService).toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.SUCCESS)
    expect(responseObject).toEqual({
      documentType: mockDocument,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(listAllDocumentTypeService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await listAllDocumentType(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
