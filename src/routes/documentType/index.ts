import { Router } from "express"
import { registerDocumentType } from "../../controllers/documentTypeController"

const documentTypeRouter = Router()

documentTypeRouter.post("/register", registerDocumentType)

export { documentTypeRouter }
