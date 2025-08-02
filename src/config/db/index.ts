import mongoose from "mongoose"

const initDb = () => {
  const { NODE_ENV, MONGO_DEV_URI, MONGO_PROD_URI } = process.env

  let mongoURI

  switch (NODE_ENV) {
    case "production":
      mongoURI = MONGO_PROD_URI
      break
    default:
      mongoURI = MONGO_DEV_URI
      break
  }

  if (mongoURI) {
    mongoose
      .connect(mongoURI, {
        serverSelectionTimeoutMS: 5000
      })
      .then(() => {
        console.log(`MongoDB connected successfully to ${NODE_ENV} database`)
      })
      .catch(error => {
        console.error("MongoDB connection error:", error)
      })
  }
}

export { initDb }
