import { createMockDocumentWithEmployee } from "../../mock"
import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import request from "supertest"

describe("POST /list-all-pending Document", () => {
  it("Should successfully return a lins of pending documents", async () => {
    await createMockDocumentWithEmployee()
    const filter = {
      page: 1,
      limit: 5
    }

    const result = await request(app)
      .post("/document/list-all-pending")
      .send(filter)

    expect(result).toBeDefined()
    expect(result.status).toBe(STATUS_CODE.SUCCESS)
    expect(result.body).toEqual(
      expect.objectContaining({
        documents: {
          currentPage: filter.page,
          totalDocuments: expect.any(Number),
          totalPages: expect.any(Number),
          documents: expect.any(Array)
        },
        success: true
      })
    )
    expect(result.body.documents.documents.length).toBeGreaterThan(0)
  })

  it("Should successfully return a lins of pending documents by searchFilter", async () => {
    const { employee } = await createMockDocumentWithEmployee()
    const filter = {
      page: 1,
      limit: 5,
      searchFilter: { employeeId: employee._id.toString() }
    }

    const result = await request(app)
      .post("/document/list-all-pending")
      .send(filter)

    expect(result).toBeDefined()
    expect(result.status).toBe(STATUS_CODE.SUCCESS)
    expect(result.body).toEqual(
      expect.objectContaining({
        documents: {
          currentPage: filter.page,
          totalDocuments: expect.any(Number),
          totalPages: expect.any(Number),
          documents: expect.any(Array)
        },
        success: true
      })
    )
    expect(result.body.documents.documents.length).toBeGreaterThan(0)
    expect(result.body.documents.documents[0].employee.name).toBe(employee.name)
    expect(result.body.documents.documents[0].employee.cpf).toBe(employee.cpf)
  })

  it("Should return validation errors when data is invalid", async () => {
    const filter = {
      page: "",
      limit: ""
    }

    const result = await request(app)
      .post("/document/list-all-pending")
      .send(filter)

    expect(result.status).toBe(STATUS_CODE.BAD_REQUEST)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: [
        'limit must be a `number` type, but the final value was: `NaN` (cast from the value `""`).',
        'page must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
      ]
    })
  })

  it("Should return errors when list is empty", async () => {
    const filter = {
      page: 1,
      limit: 5
    }

    const result = await request(app)
      .post("/document/list-all-pending")
      .send(filter)

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: "Documents not found"
    })
  })

  it("Should return errors when searchFilter have invalid values", async () => {
    const filter = {
      page: 1,
      limit: 5,
      searchFilter: { name: "Test" }
    }

    const result = await request(app)
      .post("/document/list-all-pending")
      .send(filter)

    expect(result.status).toBe(STATUS_CODE.BAD_REQUEST)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: "Filter must be 'employeeId' or 'documentTypeId'"
    })
  })
})
