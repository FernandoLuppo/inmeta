import DocumentType from "../../../models/documentType"
import Employee from "../../../models/employee"
import Document from "../../../models/document"

const createMockDocumentWithEmployee = async () => {
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

  const documentType = await DocumentType.create({ name: mockDocumentTypeName })
  const employee = await Employee.create(employeeData)

  const documentData = {
    name: mockDocumentName,
    status: mockDocumentStatus,
    employeeId: employee._id.toString(),
    documentTypeId: [documentType._id.toString()]
  }

  const document = await Document.create(documentData)

  return {
    documentType,
    employee,
    document
  }
}

export { createMockDocumentWithEmployee }
