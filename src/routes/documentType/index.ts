import { Router } from "express"
import {
  listAllDocumentType,
  registerDocumentType
} from "../../controllers/documentTypeController"
import { documentTypeRegisterValidation } from "../../middlewares"

const documentTypeRouter = Router()

documentTypeRouter.get("/list-all", listAllDocumentType)

documentTypeRouter.post(
  "/register",
  documentTypeRegisterValidation,
  registerDocumentType
)

export { documentTypeRouter }
