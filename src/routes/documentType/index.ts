import { Router } from "express"
import {
  listAllDocumentType,
  registerDocumentType
} from "../../controllers/documentTypeController"

const documentTypeRouter = Router()

documentTypeRouter.get("/list-all", listAllDocumentType)
documentTypeRouter.post("/register", registerDocumentType)

export { documentTypeRouter }
