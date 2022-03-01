// get daosquare's treasury

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import DaoService from 'service/dao'
import NextCors from 'nextjs-cors'

// Daosquare的多签国库地址
//const DAOSQUARE_GNOSIS_ADDRESS = '0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a'
// Daosquared
//const RICE_ETH_CONTRACT_ADDRESS = '0xbd9908b0cdd50386f92efcc8e1d71766c2782df0'
// gnosis treasury
// const gnosis_url =
//   'https://safe-client.gnosis.io/v1/chains/1/safes/0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a/balances/USD?exclude_spam=true&trusted=false'

type TokenData = {
  symbol: string
  balance: string
  fiatBalance: string
  price: string
}

type Data = {
  daoId: string
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

const fetchTreasuryData = async (
  daoId: string
): Promise<TreasuryDataType | null> => {
  const dao = await new DaoService().getDaoInfo(daoId)
  if (!dao.message) {
    const gnosis_url = dao.data?.treasury.json_url
    if (!!gnosis_url) {
      return axios.get(gnosis_url).then((response) => response.data)
    }
  }
  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  const { daoId } = req.query
  if (typeof daoId === 'string') {
    const dataRet = await fetchTreasuryData(daoId)
    if (!!dataRet) {
      const data = dataRet as TreasuryDataType
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
        daoId: daoId,
        total_balance_usd: fiatTotal,
        tokenInfo: tokens,
      }

      res.status(200).json(retData)
    }
  }
  res.status(500)
}
