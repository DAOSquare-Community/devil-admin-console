/**
 * the message structure of api
 */
type ResultMsg = {
  message: string
  data: unknown
}

/** paginated data */
type PageData<T> = {
  totalCount: number
  items: T[]
}

export type { ResultMsg, PageData }
