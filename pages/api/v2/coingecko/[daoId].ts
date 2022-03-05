// get Governance info in daosquare
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { ResultMsg } from 'types/resultmsg'

import MsgCode from 'types/msgcode'
import CoinInfo, { CoinInfoData, CoinMarketInfoData } from 'service/coininfo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultMsg>
) {
  if (req.method?.toUpperCase() === 'GET') {
    await NextCors(req, res, { methods: ['GET'], origin: '*' })
  } else {
    return res.status(405).end('Method Not Allowed')
  }

  const { daoId, method } = req.query
  const rmsg: ResultMsg<CoinInfoData | CoinMarketInfoData | null> = {
    message: '',
  }

  if (typeof daoId === 'string') {
    try {
      const coinService = new CoinInfo(daoId)
      let resCoinData
      // get the coin marketinfo
      switch (method) {
        case 'MarketInfo':
          resCoinData = await coinService.getCoinMarketInfo()
          break
        default:
          resCoinData = await coinService.getCoinInfo()
          break
      }
      rmsg.message = MsgCode.SUCCESS
      rmsg.data = resCoinData
      return res.status(200).json(rmsg)
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
