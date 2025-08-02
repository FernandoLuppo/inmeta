import { Request, Response } from "express"
import { unlinkDocument } from "../../../../controllers/documentController"
import { STATUS_CODE } from "../../../../constants"
import { unlinkDocumentService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils/"

describe("unlinkDocument Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {
      params: {
        documentId: "64c88b3f6e92bb4c788c8a1b"
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

  it("Should call unlinkDocumentationService and return 200 with deleted document infos", async () => {
    const mockDocument = {
      acknowledged: true,
      deletedCount: 1
    }

    ;(unlinkDocumentService as jest.Mock).mockResolvedValue(mockDocument)
    await unlinkDocument(mockReq as Request, mockRes as Response)

    expect(unlinkDocumentService).toHaveBeenCalledWith({
      _id: mockReq.params?.documentId
    })
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.SUCCESS)
    expect(responseObject).toEqual({
      document: mockDocument,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(unlinkDocumentService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await unlinkDocument(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
