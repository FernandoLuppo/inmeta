import { Request, Response } from "express"
import { linkDocument } from "../../../../controllers/documentController"
import { STATUS_CODE } from "../../../../constants"
import { linkDocumentService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("linkDocument Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {
      body: {
        name: "Driver's License",
        status: "pending",
        employeeId: "60e7bdf9c25e6e4560f6e7b1",
        documentTypeId: "64c88b3f6e92bb4c788c8a1b"
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

  it("Should call linkDocumentationService and return 201 with document", async () => {
    const mockDocument = {
      _id: "64c88b3f6e92bb4c788c8a1b",
      name: mockReq.body.name,
      status: mockReq.body.status
    }

    ;(linkDocumentService as jest.Mock).mockResolvedValue(mockDocument)

    await linkDocument(mockReq as Request, mockRes as Response)

    expect(linkDocumentService).toHaveBeenCalledWith({
      documentTypeId: mockReq.body.documentTypeId,
      employeeId: mockReq.body.employeeId,
      props: {
        name: mockReq.body.name,
        status: mockReq.body.status
      }
    })
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.CREATED)
    expect(responseObject).toEqual({
      document: mockDocument,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(linkDocumentService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await linkDocument(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
