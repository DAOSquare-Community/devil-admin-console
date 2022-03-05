import { request } from 'lib/request/axios-helper'
import { format } from 'util'

/**
 * the coin info
 */
export type CoinInfoData = {
  daoId: string
  symbol: string
  tokenprice: number
  totalsupply: number
  market: number
}

/**
 * the coin market info
 */
export type CoinMarketInfoData = {
  daoId: string
  prices: number[]
  total_volumes: number[]
}

export default class CoinInfo {
  // the coingecko api
  private _url_coingecko = 'https://api.coingecko.com/api/v3/coins/%s'
  private _daoId = ''

  constructor(daoId: string) {
    this._daoId = daoId
  }

  /**
   * get the coin info
   *
   * @memberof CoinInfo
   */
  public getCoinInfo = async (): Promise<CoinInfoData | null> => {
    const fetchData = await request({
      url: format(this._url_coingecko, this._daoId),
      method: 'GET',
    })

    if (!!fetchData) {
      const retData: CoinInfoData = {
        daoId: fetchData.id,
        symbol: fetchData.symbol,
        tokenprice: fetchData.market_data.current_price.usd,
        totalsupply: fetchData.market_data.total_supply,
        market:
          fetchData.market_data.current_price.usd *
          fetchData.market_data.total_supply,
      }
      return retData
    }
    return null
  }

  /**
   * get the coin market info
   *
   * @returns CoinMarketInfoData
   */
  public getCoinMarketInfo = async (): Promise<CoinMarketInfoData | null> => {
    const url_market = `${format(
      this._url_coingecko,
      this._daoId
    )}/market_chart`

    const fetchData = await request<CoinMarketInfoData | null>({
      url: url_market,
      method: 'GET',
      payload: {
        vs_currency: 'usd',
        days: 'max',
        interval: 'daily',
      },
    })

    if (!!fetchData) {
      const retData: CoinMarketInfoData = {
        daoId: this._daoId,
        prices: fetchData.prices,
        total_volumes: fetchData.total_volumes,
      }
      return retData
    }
    return null
  }
}
