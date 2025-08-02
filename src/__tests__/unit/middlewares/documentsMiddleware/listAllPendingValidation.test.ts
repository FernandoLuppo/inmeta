import { Request, Response, NextFunction } from "express"
import { listAllPendingValidation } from "../../../../middlewares"
import { handleError } from "../../../../utils"

jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

describe("listAllPendingValidation middleware", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let mockNext: NextFunction

  beforeEach(() => {
    mockReq = {
      body: {}
    }

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mockNext = jest.fn()
    jest.clearAllMocks()
  })

  it("Should call next() if validation passes", async () => {
    mockReq.body = {
      limit: 5,
      page: 1
    }

    await listAllPendingValidation(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    )

    expect(mockNext).toHaveBeenCalled()
    expect(handleError).not.toHaveBeenCalled()
  })

  it("Should call handleError if validation fails", async () => {
    mockReq.body = {
      limit: null,
      page: null
    }

    await listAllPendingValidation(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    )

    expect(mockNext).not.toHaveBeenCalled()
    expect(handleError).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.anything(),
        res: mockRes
      })
    )
  })
})
