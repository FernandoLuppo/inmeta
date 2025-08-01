import { model, Schema } from "mongoose"

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    cpf: {
      type: String,
      required: true,
      unique: true
    },
    hiredAt: {
      type: Date,
      required: true,
      default: () => new Date(),
      get: (date: Date) => date.toLocaleString("pt-BR")
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true }
  }
)

export default model("Employee", EmployeeSchema)
