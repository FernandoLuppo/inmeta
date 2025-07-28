import cors from "cors"
import express from "express"
import * as dotenv from "dotenv"

import { corsConfig } from "./config/cors"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors(corsConfig))

export { app }
