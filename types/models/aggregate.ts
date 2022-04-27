import { TreasuryToken } from 'models/TreasuryToken'
import { CoinInfoData, CoinMarketInfoData } from 'service/coininfo'
import { GovernanceData } from 'service/governance'
import { DeworkStatsData } from './dework'
import { SeshData } from './sesh'
import { TwitterData } from './twitter'

type AggregateData = {
  twitter_follower?: TwitterData
  sesh?: SeshData
  dework?: DeworkStatsData
  members?: number
  treasury?: TreasuryToken
  coingecko?: {
    coin_data?: CoinInfoData
    coin_market?: CoinMarketInfoData
  }
  governance?: GovernanceData
  [x: string]: unknown
}

export type { AggregateData }
