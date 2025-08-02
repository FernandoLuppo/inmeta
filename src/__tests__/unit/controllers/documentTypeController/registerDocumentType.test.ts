import { Request, Response } from "express"
import { registerDocumentType } from "../../../../controllers/documentTypeController"
import { STATUS_CODE } from "../../../../constants"
import { registerDocumentTypeService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("registerDocumentType Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {
      body: {
        name: "Personal documents"
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

  it("Should call registerDocumentTypeService and return 201 with document type", async () => {
    const mockDocument = {
      _id: "688a482e739415821342c1e4",
      name: mockReq.body.name
    }

    ;(registerDocumentTypeService as jest.Mock).mockResolvedValue(mockDocument)
    await registerDocumentType(mockReq as Request, mockRes as Response)

    expect(registerDocumentTypeService).toHaveBeenCalledWith({
      name: mockDocument.name
    })
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.CREATED)
    expect(responseObject).toEqual({
      documentType: mockDocument,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(registerDocumentTypeService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await registerDocumentType(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
