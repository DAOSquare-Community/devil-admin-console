type DaoStatsHistory = {
  data: HistoryData[]
}

type HistoryData = {
  daos: number
  members: number
  treasury: number
  create_at: Date
}

export type { DaoStatsHistory, HistoryData }
