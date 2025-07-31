import mongoose from "mongoose"
import { STATUS_CODE } from "../../constants"
import Document from "../../models/document"
import DocumentType from "../../models/documentType"
import { CustomError } from "../../utils"

interface IDocuments {
  name: string
  status: "pending" | "completed"
}

interface ILinkDocumentService {
  props: IDocuments
  documentId: string
  employeeId: string
}

const linkDocumentService = async ({
  props,
  documentId,
  employeeId
}: ILinkDocumentService) => {
  const document = await Document.create({
    name: props.name,
    status: props.status,
    documentTypeId: documentId,
    employeeId: employeeId
  })

  if (!document) {
    throw new CustomError({
      message:
        "An error occurred while linking the document to the employee. Please check the input data and try again.",
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }

  return document
}

const unlinkDocumentService = async ({ _id }: { _id: string }) => {
  const document = await Document.deleteOne({ _id })

  if (document.deletedCount === 0) {
    throw new CustomError({
      message: "Document not found",
      statusCode: STATUS_CODE.NOT_FOUND
    })
  }

  return document
}

const documentsStatusByEmployeeService = async ({
  employeeId
}: {
  employeeId: string
}) => {
  const document = await Document.find({ employeeId })
    .sort({ status: -1 })
    .select("name status documentTypeId ")

  if (!document) {
    throw new CustomError({
      message: "Employee not found",
      statusCode: STATUS_CODE.NOT_FOUND
    })
  }

  return document
}

interface ISearchFilter {
  (key: string): string
}

interface IListAllPendingService {
  searchFilter: ISearchFilter | undefined
  filters: {
    limit: number
    page: number
  }
}

const listAllPendingService = async ({
  searchFilter,
  filters
}: IListAllPendingService) => {
  const limit = filters.limit || null
  const page = filters.page || 1
  const skip = limit ? (page - 1) * limit : 0
  const matchFilter: any = { status: "pending" }

  if (searchFilter && Object.keys(searchFilter).length > 0) {
    validateListAllPendingFilter(searchFilter)

    const key = Object.keys(searchFilter)[0]
    const value = Object.values(searchFilter)[0]
    matchFilter[key] = new mongoose.Types.ObjectId(value)
  }

  const document = await Document.aggregate([
    { $match: matchFilter },
    {
      $sort: { createdAt: -1 }
    },
    {
      $skip: Number(skip)
    },
    {
      $limit: Number(filters.limit)
    },
    {
      $lookup: {
        from: "employees",
        localField: "employeeId",
        foreignField: "_id",
        as: "employee"
      }
    },
    {
      $unwind: {
        path: "$employee",
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $lookup: {
        from: "documenttypes",
        localField: "documentTypeId",
        foreignField: "_id",
        as: "documentType"
      }
    },
    {
      $project: {
        name: 1,
        status: 1,
        employee: {
          name: "$employee.name",
          cpf: "$employee.cpf",
          hiredAt: "$employee.hiredAt"
        },
        documentTypes: {
          $map: {
            input: "$documentType",
            as: "type",
            in: {
              _id: "$$type._id",
              name: "$$type.name"
            }
          }
        }
      }
    }
  ])

  if (!document) {
    throw new CustomError({
      message: "Documents not found",
      statusCode: STATUS_CODE.NOT_FOUND
    })
  }

  return document
}

const validateListAllPendingFilter = (
  searchFilter: ISearchFilter | undefined
) => {
  const allowedKeys = ["employeeId", "documentTypeId"]

  if (
    searchFilter &&
    Object.keys(searchFilter) &&
    !allowedKeys.includes(Object.keys(searchFilter)[0])
  ) {
    throw new CustomError({
      message: "Filter must be 'employeeId' or 'documentTypeId'",
      statusCode: STATUS_CODE.BAD_REQUEST
    })
  }
}

export {
  linkDocumentService,
  unlinkDocumentService,
  documentsStatusByEmployeeService,
  listAllPendingService
}
