type DeworkData = {
  organization: {
    tasks: {
      id: string
      status:
        | 'BACKLOG'
        | 'TODO'
        | 'IN_PROGRESS'
        | 'IN_REVIEW'
        | 'DONE'
        | 'COMMUNITY_SUGGESTIONS'
    }[]
  }
}

type DeworkStatsData = {
  progress: number
  todo: number
  inreview: number
  suggestion: number
  done: number
}

type DeworkDataErrors = {
  Errors: { message: string }[]
}

export type { DeworkData, DeworkDataErrors, DeworkStatsData }
