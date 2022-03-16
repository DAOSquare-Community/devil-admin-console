// get coin info

import { ResultMsg } from 'types/resultmsg'

import { MsgCode } from 'types/const-enum'
import CoinInfo, { CoinInfoData, CoinMarketInfoData } from 'service/coininfo'
import { createHandler, Get, Query } from '@storyofams/next-api-decorators'

class CoinController {
  // GET /api/coingecko
  @Get()
  public async getCoinInfo(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<CoinInfoData | null>> {
    const rmsg: ResultMsg<CoinInfoData | null> = {
      message: '',
    }
    const resCoinData = await new CoinInfo(daoId).getCoinInfo()
    rmsg.message = MsgCode.SUCCESS
    rmsg.data = resCoinData
    return rmsg
  }

  // GET /api/coingecko/market
  @Get('/market')
  public async getCoinMarket(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<CoinMarketInfoData | null>> {
    const rmsg: ResultMsg<CoinMarketInfoData | null> = {
      message: '',
    }
    const resCoinMarketData = await new CoinInfo(daoId).getCoinMarketInfo()
    rmsg.message = MsgCode.SUCCESS
    rmsg.data = resCoinMarketData
    return rmsg
  }
}

export default createHandler(CoinController)
