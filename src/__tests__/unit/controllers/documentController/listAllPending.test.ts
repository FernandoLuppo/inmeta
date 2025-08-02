import { Request, Response } from "express"
import { listAllPending } from "../../../../controllers/documentController"
import { STATUS_CODE } from "../../../../constants"
import { listAllPendingService } from "../../../../services"

jest.mock("../../../../services")
jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

import { handleError } from "../../../../utils"

describe("listAllPending Controller", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    mockReq = {
      body: {
        page: 1,
        limit: 3,
        searchFilter: {
          employeeId: "68881eda82f9e66445b60479"
        }
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

  it("Should call listAllPendingService and return 200 with document", async () => {
    const mockDocument = {
      totalDocuments: 24,
      totalPages: 8,
      currentPage: mockReq.body.page,
      documents: [
        {
          _id: "60d5ec49f1a4a4a3b1e5c8d1",
          name: "Sample Document",
          status: "pending",
          employee: {
            name: "John Doe",
            cpf: "000.000.000-00",
            hiredAt: "2023-01-01T12:00:00.000Z"
          },
          documentTypes: [
            {
              _id: "60d5ec49f1a4a4a3b1e5c8d2",
              name: "Sample Document Type"
            }
          ]
        }
      ]
    }

    ;(listAllPendingService as jest.Mock).mockResolvedValue(mockDocument)

    await listAllPending(mockReq as Request, mockRes as Response)

    expect(listAllPendingService).toHaveBeenCalledWith({
      filters: {
        limit: mockReq.body.limit,
        page: mockReq.body.page
      },
      searchFilter: mockReq.body?.searchFilter
    })
    expect(mockRes.status).toHaveBeenCalledWith(STATUS_CODE.SUCCESS)
    expect(responseObject).toEqual({
      success: true,
      documents: {
        totalDocuments: mockDocument.totalDocuments,
        totalPages: mockDocument.totalPages,
        currentPage: mockDocument.currentPage,
        documents: mockDocument.documents
      }
    })
  })

  it("Should handle service errors with handleError", async () => {
    const mockError = new Error("Database failure")

    ;(listAllPendingService as jest.Mock).mockRejectedValue(mockError)
    ;(handleError as jest.Mock).mockClear()

    await listAllPending(mockReq as Request, mockRes as Response)

    expect(handleError).toHaveBeenCalledWith({
      error: mockError,
      res: mockRes
    })
  })
})
