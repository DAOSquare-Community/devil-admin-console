// get daosquare's price,market totalsupply

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
// import tunnel from 'tunnel'
import Cors from 'cors'
import runMiddleware from 'lib/middleware/runMiddleware'

type Data = {
  daoId: string
  symbol: string
  tokenprice: number
  totalsupply: number
  market: number
}
const url_coingecko = 'https://api.coingecko.com/api/v3/coins/daosquare'
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// daosquare
const fetchCoinGeckoData = async () => {
  return axios.get(url_coingecko).then((response) => response.data)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors)
  const { daoId } = req.query
  if (typeof daoId === 'string') {
    const fetchData = await fetchCoinGeckoData()
    if (!!fetchData) {
      const retData: Data = {
        daoId: fetchData.id,
        symbol: fetchData.symbol,
        tokenprice: fetchData.market_data.current_price.usd,
        totalsupply: fetchData.market_data.total_supply,
        market:
          fetchData.market_data.current_price.usd *
          fetchData.market_data.total_supply,
      }
      res.status(200).json(retData)
    }
  }
  res.status(500)
}
