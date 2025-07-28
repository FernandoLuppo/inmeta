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
    timestamps: true
  }
)

export default model("DocumentType", DocumentTypeSchema)
