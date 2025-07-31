import { app } from "./app"
import http from "http"
import detect from "detect-port"

const { PORT } = process.env

const startServer = async () => {
  const port = await detect(Number(PORT) || 3000)
  const server = http.createServer(app)

  server.listen(port, () => {
    console.log("Server running on port", port)
  })
}

startServer()
