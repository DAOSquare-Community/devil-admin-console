// get Governance info in daosquare
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import Governance, { GovernanceData } from 'service/governance'
import { ResultMsg } from 'types/resultmsg'

import { Dao } from 'models/Dao'
import MsgCode from 'types/msgcode'
import DaoService from 'service/dao'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultMsg<GovernanceData | null>>
) {
  if (req.method?.toUpperCase() === 'GET') {
    await NextCors(req, res, { methods: ['GET'], origin: '*' })
  } else {
    return res.status(405).end('Method Not Allowed')
  }

  const { daoId } = req.query
  const rmsg: ResultMsg<GovernanceData | null> = {
    message: '',
  }

  if (typeof daoId === 'string') {
    try {
      const resDao = await new DaoService().getDaoInfo(daoId)
      if (resDao.message) {
        rmsg.message = resDao.message
        return res.status(500).json(rmsg)
      } else {
        rmsg.message = MsgCode.SUCCESS
        if (resDao.data) {
          rmsg.data = await new Governance(
            resDao.data as Dao
          ).getGovernanceData()
        }
        return res.status(200).json(rmsg)
      }
    } catch (err) {
      if (err instanceof Error) {
        rmsg.message = err.message
      } else {
        rmsg.message = MsgCode.FAILURE
      }
      return res.status(500).json(rmsg)
    }
  }
  rmsg.message = 'daoId is error'
  return res.status(500).json(rmsg)
}
