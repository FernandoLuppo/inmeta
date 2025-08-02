import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import DocumentType from "../../../models/documentType"
import Employee from "../../../models/employee"
import Document from "../../../models/document"
import request from "supertest"

describe("GET /documents-status-by-employee/:employeeId Document", () => {
  it("Should list the employee's documents showing their status", async () => {
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
    await Document.create(documentData)

    const result = await request(app).get(
      `/document/documents-status-by-employee/${employee._id}`
    )

    expect(result.status).toBe(STATUS_CODE.SUCCESS)
    expect(result.body.success).toBeTruthy()
    expect(Array.isArray(result.body.document)).toBe(true)
    expect(result.body.document[0]).toMatchObject({
      name: documentData.name,
      status: documentData.status
    })
    expect(result.body.document[0]).toHaveProperty("_id")
    expect(result.body.document[0]).toHaveProperty("documentTypeId")
  })

  it("Should return 404 if the employee is not found", async () => {
    const employeeId = "60e7bdf9c25e6e4560f6e7b1"

    const result = await request(app).get(
      `/document/documents-status-by-employee/${employeeId}`
    )

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body).toEqual({
      success: false,
      error: "Employee not found."
    })
  })

  it("Should return 404 if the employeeId is invalid", async () => {
    const employeeId = null

    const result = await request(app).get(
      `/document/documents-status-by-employee/${employeeId}`
    )

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body).toEqual({
      success: false,
      error: "employeeId is required."
    })
  })
})
