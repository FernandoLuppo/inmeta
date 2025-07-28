import { model, Schema } from "mongoose"

const DocumentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      required: true
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    documentTypeId: {
      type: Schema.Types.ObjectId,
      ref: "DocumentType",
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model("Document", DocumentSchema)
