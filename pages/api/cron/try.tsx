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
  public async executeCorn(
    @Req() req: NextApiRequest,
    @Req() res: NextApiResponse
  ) {
    try {
      const { authorization } = req.headers
      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        return { success: true }
      } else {
        throw new ForbiddenException('Fetch error,the secret key is error')
      }
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err.message : MsgCode.FAILURE
      )
    }
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
