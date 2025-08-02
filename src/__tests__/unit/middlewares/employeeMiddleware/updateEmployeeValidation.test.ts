import { Request, Response, NextFunction } from "express"
import { updateEmployeeValidation } from "../../../../middlewares"
import { handleError } from "../../../../utils"

jest.mock("../../../../utils", () => ({
  handleError: jest.fn()
}))

describe("updateEmployeeValidation middleware", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let mockNext: NextFunction

  beforeEach(() => {
    mockReq = {
      body: {
        name: "Fernando Luppo",
        _id: "60d0fe4f5311236168a109ca"
      }
    }

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mockNext = jest.fn()
    jest.clearAllMocks()
  })

  it("Should call next() if validation passes", async () => {
    await updateEmployeeValidation(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    )

    expect(mockNext).toHaveBeenCalled()
    expect(handleError).not.toHaveBeenCalled()
  })

  it("Should call handleError if validation fails", async () => {
    mockReq.body = {
      name: "",
      _id: ""
    }

    await updateEmployeeValidation(
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
