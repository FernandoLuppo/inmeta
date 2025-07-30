import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
      description: "Documentação da API feita com Swagger e TypeScript"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["src/docs/**/*.ts"]
}

const swaggerSpec = swaggerJsdoc(options)

export { swaggerUi, swaggerSpec }
