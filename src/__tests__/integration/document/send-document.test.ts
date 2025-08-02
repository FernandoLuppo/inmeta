import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import request from "supertest"
import { createMockDocumentWithEmployee } from "../../mock"

describe("POST /send-document Document", () => {
  it("Should successfully send a document to employee", async () => {
    const { document, employee } = await createMockDocumentWithEmployee()

    const mockShippingDocument = {
      documentName: "Test Shipping Document",
      employeeId: employee._id.toString(),
      documentId: document._id.toString(),
      message: "Please sign by Friday"
    }

    const result = await request(app)
      .post("/document/send-document")
      .send(mockShippingDocument)

    expect(result.body).toEqual(
      expect.objectContaining({
        documentName: mockShippingDocument.documentName,
        document: expect.objectContaining({
          name: document.name,
          status: document.status
        }),
        employee: expect.objectContaining({
          name: employee.name,
          cpf: employee.cpf
        }),
        message: mockShippingDocument.message,
        success: true
      })
    )
    expect(result.body.document).toHaveProperty("_id")
    expect(result.body.document).toHaveProperty("documentTypeId")
    expect(result.body.employee).toHaveProperty("_id")
    expect(result.body.employee).toHaveProperty("hiredAt")
  })

  it("Should return validation errors when data is invalid", async () => {
    const mockShippingDocument = {
      documentName: "",
      employeeId: "",
      documentId: "",
      message: ""
    }

    const result = await request(app)
      .post("/document/send-document")
      .send(mockShippingDocument)

    expect(result.status).toBe(STATUS_CODE.BAD_REQUEST)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: [
        "Document Name field is required.",
        "Document Name field must have at least 3 characters.",
        "EmployeeId field is required.",
        "Invalid format: employeeId must be a valid ObjectId (24 hex characters).",
        "DocumentId field is required.",
        "The documentId array must contain at least one item.",
        "Each documentId must be a valid ObjectId (24 hex characters)."
      ]
    })
  })

  it("Should return validation error when documentId is not found", async () => {
    const fakeId = "60e7bdf9c25e6e4560f6e7b1"
    const { employee } = await createMockDocumentWithEmployee()

    const mockShippingDocument = {
      documentName: "Test Shipping Document",
      employeeId: employee._id.toString(),
      documentId: fakeId,
      message: "Please sign by Friday"
    }

    const result = await request(app)
      .post("/document/send-document")
      .send(mockShippingDocument)

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: "Document not found"
    })
  })

  it("Should return validation error when employeeId is not found", async () => {
    const { document } = await createMockDocumentWithEmployee()

    const mockShippingDocument = {
      documentName: "Test Shipping Document",
      employeeId: "60e7bdf9c25e6e4560f6e7b1",
      documentId: document._id.toString(),
      message: "Please sign by Friday"
    }

    const result = await request(app)
      .post("/document/send-document")
      .send(mockShippingDocument)

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: "Employee not found"
    })
  })
})
