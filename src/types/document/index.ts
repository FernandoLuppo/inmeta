interface IDocuments {
  name: string
  status: "pending" | "completed"
}

interface ISearchFilter {
  (key: string): string
}

interface ILinkDocumentService {
  props: IDocuments
  documentTypeId: string
  employeeId: string
}

interface IListAllPendingService {
  searchFilter: ISearchFilter | undefined
  filters: {
    limit: number
    page: number
  }
}

interface ISendDocumentService {
  props: {
    employeeId: string
    documentId: string
  }
}

export {
  ISearchFilter,
  ILinkDocumentService,
  IListAllPendingService,
  ISendDocumentService
}
