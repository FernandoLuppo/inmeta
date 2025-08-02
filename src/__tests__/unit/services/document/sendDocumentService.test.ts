import Document from "../../../../models/document"
import Employee from "../../../../models/employee"
import DocumentType from "../../../../models/documentType"
import { sendDocumentService } from "../../../../services"
import { CustomError } from "../../../../utils"
import { STATUS_CODE } from "../../../../constants"

describe("sendDocumentService", () => {
  it("Should successfully send an extra document to employee", async () => {
    const mockEmployeeName = "Fernando"
    const mockEmployeeCpf = "739.058.490-46"
    const mockEmployeeHiredAt = new Date()

    const mockDocumentTypeName = "Personal Document"

    const mockDocumentName = "Test Document"
    const mockDocumentStatus = "pending"

    const employee = await Employee.create({
      name: mockEmployeeName,
      cpf: mockEmployeeCpf,
      hiredAt: mockEmployeeHiredAt
    })

    const documentType = await DocumentType.create({
      name: mockDocumentTypeName
    })

    const document = await Document.create({
      name: mockDocumentName,
      employeeId: employee._id,
      documentTypeId: documentType._id,
      status: mockDocumentStatus
    })

    const props = {
      employeeId: employee._id.toString(),
      documentId: document._id.toString()
    }

    const result = await sendDocumentService({ props })

    expect(result.employee).toEqual(
      expect.objectContaining({
        name: mockEmployeeName,
        cpf: mockEmployeeCpf,
        _id: employee._id
      })
    )
    expect(result.document).toEqual(
      expect.objectContaining({
        name: mockDocumentName,
        status: mockDocumentStatus
      })
    )
  })

  it("Should throw an error if documents is not found", async () => {
    const invalidEmployeeId = "64fa1eb8317b4fc1fba07a00"
    const invalidDocumentId = "64fa1eb8317b4fc1fba07a00"

    const props = {
      employeeId: invalidEmployeeId,
      documentId: invalidDocumentId
    }

    try {
      await sendDocumentService({ props })
      fail("Expected sendDocumentService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError)
      expect(error.message).toBe("Document not found")
      expect(error.statusCode).toBe(STATUS_CODE.NOT_FOUND)
    }
  })

  it("Should throw an error if employee is not found", async () => {
    const mockDocumentName = "Test Document"
    const mockEmployeeId = "64fa1eb8317b4fc1fba07a00"
    const mockDocumentTypeId = "64fa1eb8317b4fc1fba07a00"
    const mockDocumentStatus = "pending"

    const invalidEmployeeId = "64fa1eb8317b4fc1fba07a22"

    const document = await Document.create({
      name: mockDocumentName,
      employeeId: mockEmployeeId,
      documentTypeId: mockDocumentTypeId,
      status: mockDocumentStatus
    })

    const props = {
      employeeId: invalidEmployeeId,
      documentId: document._id.toString()
    }

    try {
      await sendDocumentService({ props })
      fail("Expected sendDocumentService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError)
      expect(error.message).toBe("Employee not found")
      expect(error.statusCode).toBe(STATUS_CODE.NOT_FOUND)
    }
  })
})
