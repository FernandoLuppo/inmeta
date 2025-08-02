import mongoose from "mongoose"
import { initDb } from "../../../../config"

jest.mock("mongoose", () => ({
  ...jest.requireActual("mongoose"),
  connect: jest.fn()
}))

describe("initDb", () => {
  const originalEnv = process.env
  const mockConnect = mongoose.connect as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it("should connect to dev database when NODE_ENV is not 'production'", async () => {
    process.env.NODE_ENV = "development"
    process.env.MONGO_DEV_URI = "mongodb://dev-uri"

    mockConnect.mockResolvedValueOnce(undefined)

    initDb()

    expect(mockConnect).toHaveBeenCalledWith("mongodb://dev-uri", {
      serverSelectionTimeoutMS: 5000
    })
  })

  it("should connect to prod database when NODE_ENV is 'production'", async () => {
    process.env.NODE_ENV = "production"
    process.env.MONGO_PROD_URI = "mongodb://prod-uri"

    mockConnect.mockResolvedValueOnce(undefined)

    initDb()

    expect(mockConnect).toHaveBeenCalledWith("mongodb://prod-uri", {
      serverSelectionTimeoutMS: 5000
    })
  })

  it("should not call connect if URI is missing", () => {
    delete process.env.MONGO_DEV_URI
    delete process.env.MONGO_PROD_URI

    initDb()

    expect(mockConnect).not.toHaveBeenCalled()
  })

  it("should catch connection error", async () => {
    process.env.NODE_ENV = "development"
    process.env.MONGO_DEV_URI = "mongodb://fail"

    const error = new Error("Connection failed")
    mockConnect.mockRejectedValueOnce(error)

    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    await initDb()

    await new Promise(process.nextTick)

    expect(consoleError).toHaveBeenCalledWith(
      "MongoDB connection error:",
      error
    )
    consoleError.mockRestore()
  })
})
