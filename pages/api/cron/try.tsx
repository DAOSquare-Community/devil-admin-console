import {
  createHandler,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Post,
  Req,
} from '@storyofams/next-api-decorators'
import { ChainCategory, DaoStats, Dework, Governanace } from 'models/DaoStats'
import { NextApiRequest, NextApiResponse } from 'next'
import DaoService from 'service/dao'
import MemberService from 'service/member'
import TreasuryService from 'service/treasury'
import * as DeworkService from 'service/dework'
import * as GovernanaceService from 'service/governance'
import DaoStatsService from 'service/daostats'
import { MsgCode } from 'types/const-enum'

class CronController {
  private _daoService = new DaoService()
  private _memberService = new MemberService()
  private _treasuryService = new TreasuryService()
  private _deworkService = new DeworkService.default()
  private _daoStatsService = new DaoStatsService()
  //private _govService = new GovernanaceService.default()

  // GET /api/cron/try
  @Post()
  public async executeCorn(@Req() req: NextApiRequest) {
    try {
      const { authorization } = req.headers
      if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`)
        throw new ForbiddenException(MsgCode.AUTH_FAILED)

      // get dao count
      let daoCount = 0
      const retDao = await this._daoService.getCount({})
      if (retDao.message) throw new InternalServerErrorException(retDao.message)
      daoCount = retDao.data ?? 0

      // get member count
      let memberCount = 0
      const resMember = await this._memberService.getCount({})
      if (resMember.message)
        throw new InternalServerErrorException(resMember.message)
      memberCount = resMember.data ?? 0

      // the chain count
      const chainMap = new Map<string, number>()
      // the treasury
      let treasury = 0
      // the Governanace
      const gov: Governanace = {
        grace: 0,
        passed: 0,
        process: 0,
        unsponsored: 0,
        voting: 0,
        excution: 0,
      }
      // the dework
      const dework: Dework = {
        progress: 0,
        todo: 0,
        inreview: 0,
      }

      // get the DAO entity
      const pageSize = 10
      const page = Math.ceil(daoCount / pageSize)
      for (let p = 0; p < page; p++) {
        const daosResult = await this._daoService.getList(
          p + 1,
          pageSize,
          {},
          { daoId: 1 }
        )
        if (daosResult.message) {
          console.log(`corn error:${daosResult.message},page:${p + 1}`)
          throw new InternalServerErrorException(
            `corn error:${daosResult.message},page:${p + 1}`
          )
        } else {
          for (const dao of daosResult.data?.items ?? []) {
            // get the  chain count
            const chainTypeCount = chainMap.get(dao.dao_contract.chain_type)
            chainMap.set(
              dao.dao_contract.chain_type,
              chainTypeCount ? chainTypeCount + 1 : 1
            )

            // get the treasury
            const t = await this._treasuryService.addTreasuryTokenFromDao(dao)
            treasury = treasury + (t ? t.total_amount : 0)

            // get the Governanace
            const g = await new GovernanaceService.default(
              dao
            ).getGovernanceData()

            gov.grace += g.grace
            gov.passed += g.passed
            gov.process += g.process
            gov.unsponsored += g.unsponsored
            gov.voting += g.voting
            gov.excution += g.excution

            // get the dework
            const d = await this._deworkService.getDeworkData(dao.daoId)
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
            }
          }
        }
      } // end for  page  for loop

      const ccArr = Array.from(chainMap).map((item) => {
        const c: ChainCategory = {
          chain_type: item[0],
          count: item[1],
        }
        return c
      })
      const date = new Date()
      const daoStats = new DaoStats()
      daoStats.daos = daoCount
      daoStats.members = memberCount
      daoStats.treasury = treasury
      daoStats.chain_category = ccArr
      daoStats.governanace = gov
      daoStats.dework = dework
      daoStats.create_at = daoStats.last_update_at = date
      const retDaoStats = await this._daoStatsService.insertEntity(daoStats)
      if (retDaoStats.message) {
        const err = `corn error:${retDaoStats.message},datetime:${new Date()}`
        console.log(err)
        throw new InternalServerErrorException(err)
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : MsgCode.FAILURE)
      throw new InternalServerErrorException(
        err instanceof Error ? err.message : MsgCode.FAILURE
      )
    } // end for  try...catch

    //private
  }
}
export default createHandler(CronController)
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     try {
//       const { authorization } = req.headers
//       if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
//         res.status(200).json({ success: true })
//       } else {
//         throw new Error('Fetch error')
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         res.status(500).json({ message: err.message })
//       }
//     }
//   } else {
//     res.setHeader('Allow', 'POST')
//     res.status(405).end('Method Not Allowed')
//   }
// }
