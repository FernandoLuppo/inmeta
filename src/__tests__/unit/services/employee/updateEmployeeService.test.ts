import Employee from "../../../../models/employee"
import { updateEmployeeService } from "../../../../services"

describe("updateEmployeeService", () => {
  it("Should successfully registrant a documentType", async () => {
    const mockName = "Fernando"
    const mockCpf = "739.058.490-46"
    const mockHiredAt = new Date()

    const employee = await Employee.create({
      name: mockName,
      cpf: mockCpf,
      hiredAt: mockHiredAt
    })

    const props: any = {
      name: mockName,
      _id: employee._id.toString()
    }

    const result = await updateEmployeeService({ props })
    expect(result).toBeDefined()
    expect(result).toEqual(
      expect.objectContaining({
        name: mockName,
        cpf: mockCpf
      })
    )
    expect(result).toHaveProperty("_id")
    expect(result).toHaveProperty("hiredAt")
    expect(result).toHaveProperty("createdAt")
    expect(result).toHaveProperty("updatedAt")
  })

  it("Should throw an error if name is an invalid value or not exist", async () => {
    const mockId = ""
    const mockName = ""

    const props: any = {
      name: mockName,
      _id: mockId
    }

    try {
      await updateEmployeeService({ props })
      fail("Expected updateEmployeeService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.name).toBe("CastError")
      expect(error.message).toMatch(/Cast to ObjectId failed/i)
      expect(error.path).toBe("_id")
      expect(error.value).toBe("")
      expect(error.kind).toBe("ObjectId")
    }
  })
})
