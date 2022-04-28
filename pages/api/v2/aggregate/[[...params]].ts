import Treasury from 'service/treasury'
import Dework from 'service/dework'
// get twitter info
import { ResultMsg } from 'types/resultmsg'

import { createHandler, Get, Query } from '@storyofams/next-api-decorators'
import Twitter from 'service/twitter'
import { AggregateData } from 'types/models/aggregate'
import Sesh from 'service/sesh'
import Governance from 'service/governance'
import DaoService from 'service/dao'
import CoinInfo from 'service/coininfo'
import MemberService from 'service/member'
import { DeworkStatsData } from 'types/models/dework'

class AggregateController {
  /**
   * @swagger
   * /api/v2/aggregate:
   *   get:
   *     tags:
   *       - data-api(v2)
   *     summary: get aggregate api ,include twitter,sesh,dework..
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: aggregate data
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<AggregateData>
   */
  @Get()
  public async getAggregate(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<AggregateData>> {
    const ret: ResultMsg<AggregateData> = {}
    const agg: AggregateData = {}
    // twitter
    const t = await new Twitter().getTwitterFollowersNumber(daoId)
    if (!t.message && t.data) {
      agg.twitter_follower = t.data
    }

    // sesh
    const s = await new Sesh().getSeshData(daoId)
    if (!s.message && s.data) {
      agg.sesh = s.data
    }

    // dework
    try {
      const dework: DeworkStatsData = {
        progress: 0,
        todo: 0,
        inreview: 0,
        suggestion: 0,
        done: 0,
      }
      const d = await new Dework().getDeworkData(daoId)
      if (d) {
        dework.inreview += d.organization.tasks.filter(
          (item) => item.status === 'IN_REVIEW'
        ).length

        dework.progress += d.organization.tasks.filter(
          (item) => item.status === 'IN_REVIEW'
        ).length

        dework.todo += d.organization.tasks.filter(
          (item) => item.status === 'TODO'
        ).length

        dework.suggestion += d.organization.tasks.filter(
          (item) => item.status === 'COMMUNITY_SUGGESTIONS'
        ).length

        dework.done += d.organization.tasks.filter(
          (item) => item.status === 'DONE'
        ).length
        agg.dework = dework
      }
    } catch (err) {}

    // treasury
    try {
      const treasury = await new Treasury().getTreasuryDataFormDB(daoId)
      if (treasury) {
        agg.treasury = treasury
      }
    } catch (err) {}

    // coingecko
    try {
      const coingeckoService = new CoinInfo(daoId)
      const resCoinData = await coingeckoService.getCoinInfo()
      const resCoinMarketData = await coingeckoService.getCoinMarketInfo()
      if (resCoinData || resCoinMarketData) {
        agg.coingecko = {}
        if (resCoinData) agg.coingecko.coin_data = resCoinData
        if (resCoinMarketData) agg.coingecko.coin_market = resCoinMarketData
      }
    } catch (err) {}

    // memebers
    const retcount = await new MemberService().getCount({
      daos: { $in: [daoId] },
    })
    if (!retcount.message && retcount.data) {
      agg.members = retcount.data
    }

    // governance
    const resDao = await new DaoService().getDaoInfo(daoId)
    if (!resDao.message && resDao.data) {
      const g = await new Governance(resDao.data).getGovernanceData()
      if (g) {
        agg.governance = g
      }
    }

    ret.data = agg
    return ret
  }
}
export default createHandler(AggregateController)
