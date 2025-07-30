import { model, Schema, Types } from "mongoose"

const DocumentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      required: true
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    documentTypeId: {
      type: [Schema.Types.ObjectId],
      ref: "DocumentType",
      validate: {
        validator: (array: Types.ObjectId[]) =>
          Array.isArray(array) && array.length > 0,
        message: "At least one document type is required."
      }
    }
  },
  {
    timestamps: true
  }
)

export default model("Document", DocumentSchema)
