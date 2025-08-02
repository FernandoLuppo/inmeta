import Employee from "../../../../models/employee"
import { registerEmployeeService } from "../../../../services"

describe("registerEmployeeService", () => {
  it("Should successfully registrant a documentType", async () => {
    const mockName = "Fernando"
    const mockCpf = "739.058.490-46"
    const mockHiredAt = new Date()
    const props: any = {
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    }

    const result = await registerEmployeeService({ props })

    expect(result).toBeDefined()
    expect(result).toEqual(
      expect.objectContaining({
        name: mockName,
        cpf: mockCpf
      })
    )
    expect(result).toHaveProperty("_id")
    expect(result).toHaveProperty("createdAt")
    expect(result).toHaveProperty("updatedAt")
  })

  it("Should throw an error if name is an invalid value", async () => {
    const mockName = ""
    const mockCpf = ""
    const mockHiredAt = new Date()
    const props: any = {
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    }

    try {
      await registerEmployeeService({ props })
      fail("Expected registerEmployeeService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.name).toBe("ValidationError")
      expect(error.message).toContain("Employee validation failed")
      expect(error.errors).toHaveProperty("cpf")
      expect(error.errors).toHaveProperty("name")
    }
  })

  it("Should throw an error if name is already registered", async () => {
    const mockName = "Fernando"
    const mockCpf = "739.058.490-46"
    const mockHiredAt = new Date()

    await Employee.create({
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    })

    const props: any = {
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    }

    try {
      await registerEmployeeService({ props })
      fail("Expected registerEmployeeService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.code).toBe(11000)
      expect(error.message).toMatch(/duplicate key error/i)
      expect(error.keyValue).toHaveProperty("cpf", props.cpf)
      expect(error.keyPattern).toEqual({ cpf: 1 })
      expect(error.keyValue).toEqual({ cpf: props.cpf })
    }
  })
})
