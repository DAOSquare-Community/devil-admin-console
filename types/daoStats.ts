export type DaoStatsRecord = { date: Date; value: number }
export type DaoStatsData = {
  daosRecords: DaoStatsRecord[]
  membersRecords: DaoStatsRecord[]
  treasuryRecords: DaoStatsRecord[]
}
