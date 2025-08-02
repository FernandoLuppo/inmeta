import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import Document from "../../../models/document"
import DocumentType from "../../../models/documentType"
import Employee from "../../../models/employee"
import request from "supertest"

describe("Delete unlink-document/:documentId Document", () => {
  it("Should successfully unlink a document", async () => {
    const mockDocumentTypeName = "Test Document Type"

    const mockEmployeeName = "Fernando"
    const mockEmployeeCPF = "688.556.170-36"
    const mockEmployeeHiredAt = new Date()

    const mockDocumentName = "Test Document"
    const mockDocumentStatus = "pending"

    const employeeData = {
      name: mockEmployeeName,
      cpf: mockEmployeeCPF,
      hiredAt: mockEmployeeHiredAt
    }

    const documentType = await DocumentType.create({
      name: mockDocumentTypeName
    })
    const employee = await Employee.create(employeeData)

    const documentData = {
      name: mockDocumentName,
      status: mockDocumentStatus,
      employeeId: employee._id.toString(),
      documentTypeId: [documentType._id.toString()]
    }

    const document = await Document.create(documentData)
    console.log({ document })

    const result = await request(app).delete(
      `/document/unlink-document/${document._id}`
    )

    expect(result.status).toBe(STATUS_CODE.SUCCESS)
    expect(result.body.success).toBeTruthy()
    expect(result.body).toEqual({
      success: true,
      document: { acknowledged: true, deletedCount: 1 }
    })
  })

  it("Should return validation errors when data is invalid", async () => {
    const documentId = null

    const result = await request(app).delete(
      `/document/unlink-document/${documentId}`
    )

    expect(result.status).toBe(STATUS_CODE.BAD_REQUEST)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: "_id is required to unlink a document."
    })
  })

  it("Should return validation errors when data is not founded", async () => {
    const documentId = "60e7bdf9c25e6e4560f6e7b1"

    const result = await request(app).delete(
      `/document/unlink-document/${documentId}`
    )

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: "Document not found."
    })
  })
})
