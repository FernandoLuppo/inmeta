import { MongoMemoryServer } from "mongodb-memory-server"
import { connect, connection } from "mongoose"

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await connect(uri, {
    ignoreUndefined: true
  })
})

beforeEach(async () => {
  if (connection?.db) {
    const collections = await connection.db.collections()
    for (const collection of collections) {
      await collection.deleteMany({})
    }
  }
})

afterAll(async () => {
  await connection.close()
  await mongo.stop()
})
