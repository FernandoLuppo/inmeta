import { app } from "../../../app"
import { STATUS_CODE } from "../../../constants"
import Employee from "../../../models/employee"
import request from "supertest"

describe("GET /list-all Employee", () => {
  it("should return list of employees if found", async () => {
    await Employee.create([
      { name: "John Doe", cpf: "123.456.789-00", hiredAt: new Date() }
    ])

    const result = await request(app).get("/employee/list-all")

    expect(result.status).toBe(STATUS_CODE.SUCCESS)
    expect(result.body.success).toBeTruthy()
    expect(result.body.employee[0]).toHaveProperty("name", "John Doe")
    expect(result.body.employee[0]).toHaveProperty("cpf", "123.456.789-00")
    expect(result.body.employee[0]).toHaveProperty("hiredAt")
  })

  it("should return 404 if no employees are found", async () => {
    const result = await request(app).get("/employee/list-all")

    expect(result.status).toBe(STATUS_CODE.NOT_FOUND)
    expect(result.body).toEqual({
      success: false,
      error:
        "No employee found. Please make sure there are employee registered."
    })
  })
})
