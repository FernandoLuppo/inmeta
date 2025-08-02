import DocumentType from "../../../../models/documentType"
import { registerDocumentTypeService } from "../../../../services"

describe("registerDocumentTypeService", () => {
  it("Should successfully registrant a documentType", async () => {
    const mockName = "Personal Document"

    const result = await registerDocumentTypeService({ name: mockName })

    expect(result).toBeDefined()
    expect(result).toEqual(
      expect.objectContaining({
        name: mockName
      })
    )
    expect(result).toHaveProperty("_id")
    expect(result).toHaveProperty("createdAt")
    expect(result).toHaveProperty("updatedAt")
  })

  it("Should throw an error if name is an invalid value", async () => {
    const mockName = ""

    try {
      await registerDocumentTypeService({ name: mockName })
      fail("Expected registerDocumentTypeService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toContain("DocumentType validation failed")
      expect(error.errors?.name?.kind).toBe("required")
      expect(error.errors?.name?.path).toBe("name")
    }
  })

  it("Should throw an error if name is already registered", async () => {
    const mockDocumentTypeName = "Personal Document"
    await DocumentType.create({
      name: mockDocumentTypeName
    })

    try {
      await registerDocumentTypeService({ name: mockDocumentTypeName })
      fail("Expected registerDocumentTypeService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.code).toBe(11000)
      expect(error.message).toMatch(/duplicate key error/i)
      expect(error.keyPattern).toEqual({ name: 1 })
      expect(error.keyValue).toEqual({ name: mockDocumentTypeName })
    }
  })
})
