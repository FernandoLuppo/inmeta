import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import request from "supertest"

describe("POST /register Employee", () => {
  it("Should successfully register an employee", async () => {
    const mockName = "Fernando"
    const mockCpf = "739.058.490-46"
    const mockHiredAt = new Date()

    const body = {
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    }
    const result = await request(app).post("/employee/register").send(body)

    expect(result.status).toBe(STATUS_CODE.CREATED)
    expect(result.body.success).toBeTruthy()
    expect(result.body).toEqual({
      success: true,
      employee: expect.objectContaining({
        name: mockName,
        cpf: mockCpf
      })
    })
    expect(result.body.employee).toHaveProperty("hiredAt")
    expect(result.body.employee).toHaveProperty("_id")
    expect(result.body.employee).toHaveProperty("createdAt")
    expect(result.body.employee).toHaveProperty("updatedAt")
  })

  it("Should return validation errors when data is invalid", async () => {
    const mockName = ""
    const mockCpf = ""
    const mockHiredAt = ""

    const body = {
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    }
    const result = await request(app).post("/employee/register").send(body)

    expect(result.status).toBe(STATUS_CODE.BAD_REQUEST)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: [
        "Name field is required.",
        "Name field must have at least 3 characters.",
        "CPF field is required.",
        "Invalid format, CPF must be 000.000.000-00.",
        "Invalid CPF number.",
        'hiredAt must be a `date` type, but the final value was: `Invalid Date` (cast from the value `""`).'
      ]
    })
  })

  it("Should return an error when trying to register a duplicate employee", async () => {
    const mockName = "Fernando"
    const mockCpf = "739.058.490-46"
    const mockHiredAt = new Date()
    const body = {
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    }

    await request(app).post("/employee/register").send(body)
    const result = await request(app).post("/employee/register").send(body)

    expect(result.status).toBe(STATUS_CODE.CONFLICT)
    expect(result.body).toEqual({
      success: false,
      error: "cpf already in use"
    })
  })
})
