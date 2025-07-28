import { model, Schema } from "mongoose"

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true,
      unique: true
    },
    hiredAt: {
      type: Date,
      required: true,
      default: new Date()
    }
  },
  {
    timestamps: true
  }
)

export default model("Employee", EmployeeSchema)
