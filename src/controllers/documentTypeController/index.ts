import { Request, Response } from "express"
import { handleError } from "../../utils"
import { registerDocumentTypeService } from "../../services"
import { STATUS_CODE } from "../../constants"

const registerDocumentType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const documentType = await registerDocumentTypeService({ name })

    return res.status(STATUS_CODE.CREATED).send({ documentType, success: true })
  } catch (error) {
    handleError({ error, res })
  }
}

export { registerDocumentType }
