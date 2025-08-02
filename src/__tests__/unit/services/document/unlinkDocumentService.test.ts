import Document from "../../../../models/document"
import { unlinkDocumentService } from "../../../../services"
import { CustomError } from "../../../../utils"
import { STATUS_CODE } from "../../../../constants"

describe("unlinkDocumentService", () => {
  it("Should successfully delete a document", async () => {
    const doc = await Document.create({
      name: "Test Document",
      employeeId: "64fa1eb8317b4fc1fba07a00",
      documentTypeId: ["64fa1f02317b4fc1fba07a01"]
    })

    const result = await unlinkDocumentService({ _id: doc._id.toString() })
    expect(result.deletedCount).toBe(1)

    const exists = await Document.findById(doc._id)
    expect(exists).toBeNull()
  })

  it("Should throw an error if document is not found", async () => {
    const invalidId = "64fa1eb8317b4fc1fba07a00"

    try {
      await unlinkDocumentService({ _id: invalidId })
      fail("Expected unlinkDocumentService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError)
      expect(error.message).toBe("Document not found.")
      expect(error.statusCode).toBe(STATUS_CODE.NOT_FOUND)
    }
  })
})
