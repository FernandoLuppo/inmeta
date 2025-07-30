import { STATUS_CODE } from "../../constants"
import DocumentType from "../../models/documentType"
import { CustomError } from "../../utils"

const registerDocumentTypeService = async ({ name }: { name: string }) => {
  const documentType = await DocumentType.create({ name })

  if (!documentType) {
    throw new CustomError({
      message:
        "Failed to create document type. Please verify the data and try again.",
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }

  return documentType
}

export { registerDocumentTypeService }
