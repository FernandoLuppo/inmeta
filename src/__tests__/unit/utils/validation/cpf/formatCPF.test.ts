import { formatCPF } from "../../../../../utils"

describe("formatCPF utils", () => {
  it("Should return the CPF unchanged if it's already formatted", () => {
    const input = "123.456.789-00"
    const result = formatCPF(input)
    expect(result).toBe("123.456.789-00")
  })

  it("Should format an unformatted CPF string", () => {
    const input = "12345678900"
    const result = formatCPF(input)
    expect(result).toBe("123.456.789-00")
  })
})
