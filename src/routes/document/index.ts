import { Router } from "express"
import {
  documentsStatusByEmployee,
  listAllPending,
  linkDocument,
  unlinkDocument
} from "../../controllers/documentController"

const documentRouter = Router()

documentRouter.post("/link-document", linkDocument)
documentRouter.delete("/unlink-document/:documentId", unlinkDocument)
documentRouter.get(
  "/documents-status-by-employee/:employeeId",
  documentsStatusByEmployee
)
documentRouter.post("/list-all-pending", listAllPending)

export { documentRouter }
