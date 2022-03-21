type DeworkData = {
  organization: {
    tasks: {
      id: string
      status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'
    }[]
  }
}

type DeworkDataErrors = {
  Errors: { message: string }[]
}

export type { DeworkData, DeworkDataErrors }
