import { listAllDocumentTypeService } from "../../../../services"
import DocumentType from "../../../../models/documentType"
import { CustomError } from "../../../../utils"
import { STATUS_CODE } from "../../../../constants"

describe("listAllDocumentTypeService", () => {
  it("Should successfully return list with documents type infos", async () => {
    const mockDocumentTypeName = "Personal Document"
    await DocumentType.create({
      name: mockDocumentTypeName
    })

    const results = await listAllDocumentTypeService()

    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBeGreaterThan(0)
    expect(results[0]).toEqual(
      expect.objectContaining({
        name: mockDocumentTypeName
      })
    )
    expect(results[0]).toHaveProperty("_id")
  })

  it("Should fail when the document type list is empty", async () => {
    try {
      await listAllDocumentTypeService()
      fail("Expected listAllDocumentTypeService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError)
      expect(error.message).toBe(
        "No document types found. Please make sure there are documents registered."
      )
      expect(error.statusCode).toBe(STATUS_CODE.NOT_FOUND)
    }
  })
})
