import { model, Schema } from "mongoose"

const DocumentTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    collection: "document_types"
  }
)

export default model("DocumentType", DocumentTypeSchema)
