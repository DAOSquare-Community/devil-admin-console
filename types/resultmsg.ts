/**
 * the message structure of api
 */
type ResultMsg<T = unknown> = {
  message?: string
  data?: T
}

/** paginated data */
type PageData<T> = {
  totalCount: number
  items: T[]
}

export type { ResultMsg, PageData }
