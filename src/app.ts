import cors from "cors"
import express from "express"
import * as dotenv from "dotenv"

import { corsConfig, initDb, swaggerUi, swaggerSpec } from "./config/"
import { documentRouter, documentTypeRouter, employeeRouter } from "./routes"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors(corsConfig))

app.use("/employee", employeeRouter)
app.use("/document", documentRouter)
app.use("/document-type", documentTypeRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

if (process.env.NODE_ENV !== "test") {
  initDb()
}

export { app }
