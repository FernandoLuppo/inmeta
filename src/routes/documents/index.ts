import { Router } from "express"
import {
  register,
  linkDocument,
  unlinkDocument,
  sendExtraDocument,
  documentsStatusByEmployee,
  listAllPending
} from "../../controllers/documentController"

const documentRouter = Router()

documentRouter.post("/register", register)
documentRouter.post("/link-document", linkDocument)
documentRouter.post("/unlink-document", unlinkDocument)
documentRouter.post("/send-extra-document", sendExtraDocument)
documentRouter.get("/documents-status-by-employee", documentsStatusByEmployee)
documentRouter.get("/list-all-pending", listAllPending)

export { documentRouter }
