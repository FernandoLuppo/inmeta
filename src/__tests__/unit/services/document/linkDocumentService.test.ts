import mongoose from "mongoose"
import Document from "../../../../models/document"
import { linkDocumentService } from "../../../../services"
import { ILinkDocumentService } from "../../../../types"
import { CustomError } from "../../../../utils"

describe("linkDocumentService", () => {
  it("Should successfully create a document", async () => {
    const input: ILinkDocumentService = {
      props: {
        name: "Contract",
        status: "pending"
      },
      employeeId: "688a4943f1f9a44d773b7e85",
      documentTypeId: ["688a482e739415821342c1e4"]
    }
    const mockIds = (_id: string) => new mongoose.Types.ObjectId(_id)

    const result = await linkDocumentService(input)

    expect(result).toBeDefined()
    expect(result.name).toBe("Contract")
    expect(result.status).toBe("pending")
    expect(result.documentTypeId).toEqual([mockIds("688a482e739415821342c1e4")])
    expect(result.employeeId).toEqual(mockIds("688a4943f1f9a44d773b7e85"))
  })

  it("Should throw an error if Document.create fails", async () => {
    const input: ILinkDocumentService = {
      props: {
        name: "",
        status: "pending"
      },
      documentTypeId: [""],
      employeeId: ""
    }

    try {
      await linkDocumentService(input)
      fail("Expected linkDocumentService to throw")
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBeDefined()
    }
  })
})
