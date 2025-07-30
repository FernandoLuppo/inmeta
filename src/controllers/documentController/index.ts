import { Request, Response } from "express"
import { handleError } from "../../utils"
import {
  documentsStatusByEmployeeService,
  linkDocumentService,
  listAllPendingService,
  unlinkDocumentService
} from "../../services"
import { STATUS_CODE } from "../../constants"

const linkDocument = async (req: Request, res: Response) => {
  try {
    const { name, status, employeeId, documentId } = req.body
    const props = {
      name,
      status
    }

    const document = await linkDocumentService({
      documentId,
      employeeId,
      props
    })
    return res.status(STATUS_CODE.CREATED).send({ document, success: true })
  } catch (error) {
    handleError({ error, res })
  }
}

const unlinkDocument = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.params
    const document = await unlinkDocumentService({ _id: documentId })
    return res.status(STATUS_CODE.SUCCESS).send({ document, success: true })
  } catch (error) {
    handleError({ error, res })
  }
}

const documentsStatusByEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params
    const document = await documentsStatusByEmployeeService({ employeeId })
    return res.status(STATUS_CODE.SUCCESS).send({ document, success: true })
  } catch (error) {
    handleError({ error, res })
  }
}

const listAllPending = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const filters = {
      limit: data.limit,
      page: data.page
    }

    const documents = await listAllPendingService({
      filters,
      searchFilter: data?.searchFilter
    })
    return res.status(STATUS_CODE.SUCCESS).send({ documents, success: true })
  } catch (error) {
    handleError({ error, res })
  }
}

export {
  linkDocument,
  unlinkDocument,
  documentsStatusByEmployee,
  listAllPending
}
