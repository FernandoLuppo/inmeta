import { Request, Response } from "express"
import { handleError } from "../../utils"
import {
  documentsStatusByEmployeeService,
  linkDocumentService,
  listAllPendingService,
  registerDocumentsService,
  sendExtraDocumentService,
  unlinkDocumentService
} from "../../services"

const register = (req: Request, res: Response) => {
  try {
    const {} = registerDocumentsService()
  } catch (error) {
    handleError({ error, res })
  }
}

const linkDocument = (req: Request, res: Response) => {
  try {
    const {} = linkDocumentService()
  } catch (error) {
    handleError({ error, res })
  }
}

const unlinkDocument = (req: Request, res: Response) => {
  try {
    const {} = unlinkDocumentService()
  } catch (error) {
    handleError({ error, res })
  }
}

const sendExtraDocument = (req: Request, res: Response) => {
  try {
    const {} = sendExtraDocumentService()
  } catch (error) {
    handleError({ error, res })
  }
}

const documentsStatusByEmployee = (req: Request, res: Response) => {
  try {
    const {} = documentsStatusByEmployeeService()
  } catch (error) {
    handleError({ error, res })
  }
}

const listAllPending = (req: Request, res: Response) => {
  try {
    const {} = listAllPendingService()
  } catch (error) {
    handleError({ error, res })
  }
}

export {
  register,
  linkDocument,
  unlinkDocument,
  sendExtraDocument,
  documentsStatusByEmployee,
  listAllPending
}
