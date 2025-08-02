import Document from "../../../../models/document"
import { documentsStatusByEmployeeService } from "../../../../services"
import { CustomError } from "../../../../utils"
import { STATUS_CODE } from "../../../../constants"
import mongoose from "mongoose"

describe("documentsStatusByEmployeeService", () => {
  it("Should successfully return documents by employee id", async () => {
    const mockEmployeeId = "64fa1eb8317b4fc1fba07a00"
    const mockName = "Test Document"
    const mockDocumentTypeId = [
      new mongoose.Types.ObjectId("64fa1f02317b4fc1fba07a01")
    ]

    await Document.create({
      name: mockName,
      employeeId: mockEmployeeId,
      documentTypeId: mockDocumentTypeId
    })

    const result = await documentsStatusByEmployeeService({
      employeeId: mockEmployeeId
    })
    expect(result).toBeDefined()
    expect(result[0].name).toEqual(mockName)
    expect(result[0].status).toEqual("pending")
    expect(result[0].documentTypeId).toEqual(mockDocumentTypeId)
  })

  it("Should throw an error if documents is not found", async () => {
    const invalidId = "64fa1eb8317b4fc1fba07a00"

    try {
      await documentsStatusByEmployeeService({
        employeeId: invalidId
      })
      fail("Expected documentsStatusByEmployeeService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError)
      expect(error.message).toBe("Employee not found.")
      expect(error.statusCode).toBe(STATUS_CODE.NOT_FOUND)
    }
  })
})
