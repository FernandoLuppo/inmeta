import { STATUS_CODE } from "../../../../constants"
import Employee from "../../../../models/employee"
import { listAllEmployeeService } from "../../../../services"
import { CustomError } from "../../../../utils"

describe("listAllEmployeeService", () => {
  it("Should successfully return list with employees infos", async () => {
    const mockName = "Fernando"
    const mockCpf = "739.058.490-46"
    const mockHiredAt = new Date()

    await Employee.create({
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    })

    const results = await listAllEmployeeService()

    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBeGreaterThan(0)
    expect(results[0]).toEqual(
      expect.objectContaining({
        name: mockName,
        cpf: mockCpf
      })
    )
    expect(results[0]).toHaveProperty("_id")
    expect(results[0]).toHaveProperty("hiredAt")
    expect(results[0]).toHaveProperty("createdAt")
    expect(results[0]).toHaveProperty("updatedAt")
  })

  it("Should fail when the employees list is empty", async () => {
    try {
      await listAllEmployeeService()
      fail("Expected listAllEmployeeService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError)
      expect(error.message).toBe(
        "No employee found. Please make sure there are employee registered."
      )
      expect(error.statusCode).toBe(STATUS_CODE.NOT_FOUND)
    }
  })
})
