import { Router } from "express"
import {
  documentsStatusByEmployee,
  listAllPending,
  linkDocument,
  unlinkDocument,
  sendDocument
} from "../../controllers/documentController"
import {
  linkDocumentValidation,
  listAllPendingValidation,
  sendDocumentValidation
} from "../../middlewares"

const documentRouter = Router()

documentRouter.post("/link-document", linkDocumentValidation, linkDocument)

documentRouter.delete("/unlink-document/:documentTypeId", unlinkDocument)

documentRouter.get(
  "/documents-status-by-employee/:employeeId",
  documentsStatusByEmployee
)

documentRouter.post("/send-document", sendDocumentValidation, sendDocument)

documentRouter.post(
  "/list-all-pending",
  listAllPendingValidation,
  listAllPending
)

export { documentRouter }
