// get daosquare's price,market totalsupply

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
import tunnel from 'tunnel'

type Data = {
  id: string
  symbol: string
  tokenprice: number
  totalsupply: number
  market: number
}

// daosquare
const fetchCoinGeckoData = async (daoName: string) => {
  if (daoName == 'daosquare') {
    const client = axios.create({
      baseURL: '',
      timeout: 10000,
      httpsAgent: tunnel.httpsOverHttp({
        proxy: { host: '127.0.0.1', port: 10809 },
      }),
    })

    return client
      .get('https://api.coingecko.com/api/v3/coins/daosquare')
      .then((response) => response.data)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  if (typeof id === 'string' && id == 'daosquare') {
    const fetchData = await fetchCoinGeckoData(id)
    if (fetchData !== null && fetchData != undefined) {
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
