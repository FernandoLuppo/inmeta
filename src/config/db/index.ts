import mongoose from "mongoose"

const initDb = () => {
  const { AMBIENT, MONGO_DEV_URI, MONGO_TEST_URI, MONGO_PROD_URI } = process.env

  let mongoURI

  switch (AMBIENT) {
    case "test":
      mongoURI = MONGO_TEST_URI
      break
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
        console.log(`MongoDB connected successfully to ${AMBIENT} database`)
      })
      .catch(error => {
        console.error("MongoDB connection error:", error)
      })
  }
}

export { initDb }
