import { DaoStats, DaoStatsModel } from './../models/DaoStats'

import BaseService from './base'

export default class DaoStatsService extends BaseService<
  DaoStats,
  typeof DaoStats
> {
  constructor() {
    super(DaoStatsModel)
  }

  /**
   * get the last dao stats
   *
   * @returns
   */
  public getLastDaoStatsEntity = async (): Promise<DaoStats[]> => {
    return await this.model.find<DaoStats>({}).sort({ create_at: -1 }).limit(1)
  }
}
