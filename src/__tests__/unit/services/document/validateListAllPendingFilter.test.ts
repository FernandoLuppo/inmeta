import { STATUS_CODE } from "../../../../constants"
import { validateListAllPendingFilter } from "../../../../services"
import { CustomError } from "../../../../utils"

describe("validateListAllPendingFilter Service", () => {
  it("Should pass with valid employeeId filter", () => {
    const searchFilter: any = { employeeId: "64fa1eb8317b4fc1fba07a00" }
    const result = validateListAllPendingFilter(searchFilter)

    expect(result).toBeUndefined()
  })

  it("Should throw error when filter contains invalid data", () => {
    const searchFilter: any = { test: "64fa1eb8317b4fc1fba07a00" }

    try {
      validateListAllPendingFilter(searchFilter)
      fail("Expected validateListAllPendingFilter to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError)
      expect(error.message).toBe(
        "Filter must be 'employeeId' or 'documentTypeId'"
      )
      expect(error.statusCode).toBe(STATUS_CODE.BAD_REQUEST)
    }
  })
})
