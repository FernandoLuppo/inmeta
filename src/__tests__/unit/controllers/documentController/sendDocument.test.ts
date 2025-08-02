import { Request, Response } from "express"
import { sendDocument } from "../../../../controllers/documentController"
import { STATUS_CODE } from "../../../../constants"
import { sendDocumentService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("sendDocument Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {
      body: {
        documentName: "Probation Contract",
        employeeId: "60e7bdf9c25e6e4560f6e7b1",
        documentId: "64c88b3f6e92bb4c788c8a1b",
        message: "Please sign by Friday"
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

  it("Should call sendDocument and return 200 with all document info", async () => {
    const mockDocument = {
      documentName: mockReq.body.documentName,
      document: {
        _id: "64c88b3f6e92bb4c788c8a1b",
        name: "Admission Letter",
        status: "pending",
        documentId: {
          _id: mockReq.body.documentId,
          name: "Labor Documents"
        }
      },
      employee: {
        _id: mockReq.body.employeeId,
        name: "John Doe",
        cpf: "123.456.789-00",
        hiredAt: "2023-01-01"
      }
    }

    ;(sendDocumentService as jest.Mock).mockResolvedValue(mockDocument)

    await sendDocument(mockReq as Request, mockRes as Response)

    expect(sendDocumentService).toHaveBeenCalledWith({
      props: {
        documentId: mockReq.body.documentId,
        employeeId: mockReq.body.employeeId
      }
    })
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.SUCCESS)
    expect(responseObject).toEqual({
      documentName: mockReq.body.documentName,
      document: mockDocument.document,
      employee: mockDocument.employee,
      message: mockReq.body.message,
      success: true
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(sendDocumentService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await sendDocument(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
