import DocumentType from "../../../models/documentType"
import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import request from "supertest"

describe("POST /register DocumentType", () => {
  it("Should return list of employees if found", async () => {
    const mockDocumentTypeName = "Test Document Type"

    const result = await request(app)
      .post("/document-type/register")
      .send({ name: mockDocumentTypeName })

    expect(result.status).toBe(STATUS_CODE.CREATED)
    expect(result.body.success).toBeTruthy()
    expect(result.body.documentType).toEqual(
      expect.objectContaining({
        name: mockDocumentTypeName
      })
    )
    expect(result.body.documentType).toHaveProperty("_id")
    expect(result.body.documentType).toHaveProperty("createdAt")
    expect(result.body.documentType).toHaveProperty("updatedAt")
  })

  it("Should return validation errors when data is invalid", async () => {
    const mockDocumentTypeName = ""

    const result = await request(app)
      .post("/document-type/register")
      .send({ name: mockDocumentTypeName })

    expect(result.status).toBe(STATUS_CODE.BAD_REQUEST)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: [
        "Name field is required.",
        "Name field must have at least 3 characters."
      ]
    })
  })

  it("Should return an error when trying to register a duplicate documentType", async () => {
    const mockDocumentTypeName = "Test Document Type"

    await DocumentType.create({ name: mockDocumentTypeName })

    const result = await request(app)
      .post("/document-type/register")
      .send({ name: mockDocumentTypeName })

    expect(result.status).toBe(STATUS_CODE.CONFLICT)
    expect(result.body).toEqual({
      success: false,
      error: "name already in use"
    })
  })
})
