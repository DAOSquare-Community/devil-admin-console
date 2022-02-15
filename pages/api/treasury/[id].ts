// get daosquare's treasury

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
import axios, { AxiosRequestConfig } from 'axios'

// Daosquare的多签国库地址
//const DAOSQUARE_GNOSIS_ADDRESS = '0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a'
// Daosquared
//const RICE_ETH_CONTRACT_ADDRESS = '0xbd9908b0cdd50386f92efcc8e1d71766c2782df0'
// gnosis treasury
const gnosis_url =
  'https://safe-client.gnosis.io/v1/chains/1/safes/0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a/balances/USD?exclude_spam=true&trusted=false'

type TokenData = {
  symbol: string
  balance: string
  fiatBalance: string
  price: string
}

type Data = {
  id: string
  total_balance_usd: string
  tokenInfo: TokenData[]
}

type TreasuryDataType = {
  items: {
    tokenInfo: { symbol: string }
    balance: string
    fiatBalance: string
    fiatConversion: string
  }[]
  fiatTotal: string
}

const fetchTreasuryData = async (): Promise<TreasuryDataType> => {
  return axios.get(gnosis_url).then((response) => response.data)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  if (typeof id === 'string' && id === 'daosquare') {
    const data = await fetchTreasuryData()
    if (!!data) {
      const id = 'daosquare' // id
      const fiatTotal = data.fiatTotal // total_balance_usd
      const tokens: TokenData[] = [] // tokenInfo
      data.items.forEach((element) => {
        const token: TokenData = {
          symbol: element.tokenInfo.symbol,
          balance: element.balance,
          fiatBalance: element.fiatBalance,
          price: element.fiatConversion,
        }
        tokens.push(token)
      })

      const retData: Data = {
        id: id,
        total_balance_usd: fiatTotal,
        tokenInfo: tokens,
      }

      res.status(200).json(retData)
    }
  }
  res.status(500)
}
