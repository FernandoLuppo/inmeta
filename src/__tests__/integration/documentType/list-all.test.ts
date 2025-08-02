import DocumentType from "../../../models/documentType"
import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import request from "supertest"

describe("GET /list-all DocumentType", () => {
  it("Should return list of employees if found", async () => {
    const mockDocumentTypeName = "Test Document Type"
    await DocumentType.create({ name: mockDocumentTypeName })

    const result = await request(app).get("/document-type/list-all")

    expect(result.status).toBe(STATUS_CODE.SUCCESS)
    expect(result.body.success).toBeTruthy()
    expect(result.body.documentType[0]).toHaveProperty(
      "name",
      mockDocumentTypeName
    )
    expect(result.body.documentType[0]).toHaveProperty("_id")
  })

  it("Should return 404 if no document types are found", async () => {
    const result = await request(app).get("/document-type/list-all")

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body).toEqual({
      success: false,
      error:
        "No document types found. Please make sure there are documents registered."
    })
  })
})
