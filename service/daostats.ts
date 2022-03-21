import { DaoStats, DaoStatsModel } from './../models/DaoStats'

import BaseService from './base'

export default class DaoStatsService extends BaseService<
  DaoStats,
  typeof DaoStats
> {
  constructor() {
    super(DaoStatsModel)
  }
}
