import mongoose from "mongoose"
import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import Employee from "../../../models/employee"
import request from "supertest"

describe("PATCH /update Employee", () => {
  it("Should successfully update an employee", async () => {
    const mockName = "Fernando"
    const mockCpf = "739.058.490-46"
    const mockHiredAt = new Date()
    const employeeData = {
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    }

    const employee = await Employee.create(employeeData)

    const mockUpdatedName = "Fernando Luppo"
    const body = {
      name: mockUpdatedName,
      _id: employee._id.toString()
    }

    const result = await request(app).patch("/employee/update").send(body)

    expect(result.status).toBe(STATUS_CODE.SUCCESS)
    expect(result.body.success).toBeTruthy()
    expect(result.body).toEqual({
      success: true,
      employee: expect.objectContaining({
        name: body.name,
        cpf: mockCpf,
        _id: body._id
      })
    })
    expect(result.body.employee).toHaveProperty("hiredAt")
  })

  it("Should return an error when trying to update a nonexistent employee", async () => {
    const mockUpdatedName = "Fernando Luppo"
    const body = {
      name: mockUpdatedName,
      _id: new mongoose.Types.ObjectId().toString()
    }

    const result = await request(app).patch("/employee/update").send(body)

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: "Employee not found for update"
    })
  })

  it("Should return validation errors when data is invalid", async () => {
    const body = {
      name: "",
      _id: ""
    }

    const result = await request(app).patch("/employee/update").send(body)
    expect(result.status).toBe(STATUS_CODE.BAD_REQUEST)
    expect(result.body.success).toBeFalsy()
    expect(result.body).toEqual({
      success: false,
      error: [
        "Name field is required.",
        "Name field must have at least 3 characters.",
        "_id field is required.",
        "Invalid format: _id must be a valid ObjectId (24 hex characters)."
      ]
    })
  })
})
