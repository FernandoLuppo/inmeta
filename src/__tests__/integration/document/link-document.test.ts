import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import DocumentType from "../../../models/documentType"
import Employee from "../../../models/employee"
import request from "supertest"

describe("POST /link-document Document", () => {
  it("Should successfully link a document with employee", async () => {
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

    const result = await request(app)
      .post("/document/link-document")
      .send(documentData)

    expect(result.status).toBe(STATUS_CODE.CREATED)
    expect(result.body.success).toBeTruthy()
    expect(result.body).toEqual({
      success: true,
      document: expect.objectContaining({
        name: documentData.name,
        status: documentData.status,
        employeeId: documentData.employeeId,
        documentTypeId: documentData.documentTypeId
      })
    })
    expect(result.body.document).toHaveProperty("_id")
    expect(result.body.document).toHaveProperty("createdAt")
    expect(result.body.document).toHaveProperty("updatedAt")
  })

  it("Should return validation errors when data is invalid", async () => {
    const documentData = {
      name: "",
      status: "",
      employeeId: "",
      documentTypeId: ""
    }

    const result = await request(app)
      .post("/document/link-document")
      .send(documentData)

    expect(result.status).toBe(STATUS_CODE.BAD_REQUEST)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: [
        "Name field is required.",
        "Name field must have at least 3 characters.",
        "Status must be either 'pending' or 'completed'.",
        "EmployeeId field is required.",
        "Invalid format: employeeId must be a valid ObjectId (24 hex characters).",
        'documentTypeId must be a `array` type, but the final value was: `""`.'
      ]
    })
  })
})
