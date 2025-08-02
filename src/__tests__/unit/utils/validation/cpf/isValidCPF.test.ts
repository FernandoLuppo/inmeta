import { isValidCPF } from "../../../../../utils"

describe("isValidCPF utils", () => {
  it("Should successfully validate a valid CPF", () => {
    const validCpf = "688.556.170-36"
    const result = isValidCPF(validCpf)

    expect(result).toBeDefined()
    expect(result).toBeTruthy()
  })

  it("Should fail validation for an invalid CPF", () => {
    const validCpf = "111.111.111-11"
    const result = isValidCPF(validCpf)

    expect(result).toBeDefined()
    expect(result).toBeFalsy()
  })
})
