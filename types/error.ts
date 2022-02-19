type MsgError = {
  message: string
}

type NetError = MsgError & {
  statusCode?: 500 | 404 | 400 | 401 | 403
}

export type { NetError, MsgError }
