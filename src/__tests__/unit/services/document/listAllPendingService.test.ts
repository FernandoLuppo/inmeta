import Document from "../../../../models/document"
import Employee from "../../../../models/employee"
import DocumentType from "../../../../models/documentType"
import { listAllPendingService } from "../../../../services"
import { CustomError } from "../../../../utils"
import { STATUS_CODE } from "../../../../constants"

describe("listAllPendingService", () => {
  it("Should successfully return a paginated list with documents infos", async () => {
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
    await Document.create({
      name: mockDocumentName,
      employeeId: employee._id,
      documentTypeId: documentType._id,
      status: mockDocumentStatus
    })

    const currentPage = 1
    const filters = {
      page: currentPage,
      limit: 3
    }

    const results = await listAllPendingService({ filters })

    expect(results).toBeDefined()
    expect(results).toHaveProperty("totalDocuments")
    expect(results).toHaveProperty("totalPages")
    expect(results.currentPage).toEqual(currentPage)
  })

  it("Should successfully return a paginated list filtered by search filter employeeId with documents infos", async () => {
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
    await Document.create({
      name: mockDocumentName,
      employeeId: employee._id,
      documentTypeId: documentType._id,
      status: mockDocumentStatus
    })

    const currentPage = 1
    const filters = {
      page: currentPage,
      limit: 3
    }

    const searchFilter: any = {
      employeeId: employee._id.toString()
    }

    const results = await listAllPendingService({ filters, searchFilter })

    expect(results).toBeDefined()
    expect(results).toHaveProperty("totalDocuments")
    expect(results).toHaveProperty("totalPages")
    expect(results.currentPage).toEqual(currentPage)
  })

  it("Should successfully return a paginated list filtered by search filter documentTypeId with documents infos", async () => {
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
    await Document.create({
      name: mockDocumentName,
      employeeId: employee._id,
      documentTypeId: documentType._id,
      status: mockDocumentStatus
    })

    const currentPage = 1
    const filters = {
      page: currentPage,
      limit: 3
    }

    const searchFilter: any = {
      documentTypeId: documentType._id.toString()
    }

    const results = await listAllPendingService({ filters, searchFilter })

    expect(results).toBeDefined()
    expect(results).toHaveProperty("totalDocuments")
    expect(results).toHaveProperty("totalPages")
    expect(results.currentPage).toEqual(currentPage)
  })

  it("Should throw an error if documents are not found", async () => {
    const currentPage = 1
    const filters = {
      page: currentPage,
      limit: 3
    }

    try {
      await listAllPendingService({ filters })
      fail("Expected listAllPendingService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError)
      expect(error.message).toBe("Documents not found")
      expect(error.statusCode).toBe(STATUS_CODE.NOT_FOUND)
    }
  })
})
