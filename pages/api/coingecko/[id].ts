// get daosquare's price,market totalsupply

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
//import tunnel from 'tunnel'

type Data = {
  id: string
  symbol: string
  tokenprice: number
  totalsupply: number
  market: number
}
const url_coingecko = 'https://api.coingecko.com/api/v3/coins/daosquare'

// daosquare
const fetchCoinGeckoData = async () => {
  return axios.get(url_coingecko).then((response) => response.data)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  if (typeof id === 'string' && id === 'daosquare') {
    const fetchData = await fetchCoinGeckoData()
    if (!!fetchData) {
      const retData: Data = {
        id: fetchData.id,
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
