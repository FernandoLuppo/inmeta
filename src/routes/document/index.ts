import { Router } from "express"
import {
  documentsStatusByEmployee,
  listAllPending,
  linkDocument,
  unlinkDocument
} from "../../controllers/documentController"
import {
  linkDocumentValidation,
  listAllPendingValidation
} from "../../middlewares"

const documentRouter = Router()

documentRouter.post("/link-document", linkDocumentValidation, linkDocument)

documentRouter.delete("/unlink-document/:documentId", unlinkDocument)

documentRouter.get(
  "/documents-status-by-employee/:employeeId",
  documentsStatusByEmployee
)

documentRouter.post(
  "/list-all-pending",
  listAllPendingValidation,
  listAllPending
)

export { documentRouter }
