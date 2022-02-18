// get daosquare's price,market totalsupply

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { format } from 'util'
//import tunnel from 'tunnel'
import Cors from 'cors'
import runMiddleware from 'lib/middleware/runMiddleware'

type Data = {
  daoId: string
  prices: number[]
  total_volumes: number[]
}
const url_coingecko_marketchart =
  'https://api.coingecko.com/api/v3/coins/%s/market_chart?vs_currency=usd&days=max&interval=daily'

const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// daosquare
const fetchCoinGeckoData = async (daoId: string) => {
  return axios
    .get(format(url_coingecko_marketchart, daoId))
    .then((response) => response.data)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors)
  const { daoId } = req.query
  if (typeof daoId === 'string') {
    const fetchData = await fetchCoinGeckoData(daoId)
    if (!!fetchData) {
      const retData: Data = {
        daoId: daoId,
        prices: fetchData.prices,
        total_volumes: fetchData.total_volumes,
      }
      res.status(200).json(retData)
    }
  }
  res.status(500)
}
