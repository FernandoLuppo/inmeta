import cors from "cors"
import express from "express"
import * as dotenv from "dotenv"

import { corsConfig } from "./config/cors"
import { documentRouter, employeeRouter } from "./routes"
import { initDb } from "./constants"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors(corsConfig))

app.use("/employee", employeeRouter)
app.use("/document", documentRouter)

initDb()

export { app }
