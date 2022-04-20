// get coin info

import { ResultMsg } from 'types/resultmsg'

import { MsgCode } from 'types/const-enum'
import CoinInfo, { CoinInfoData, CoinMarketInfoData } from 'service/coininfo'
import { createHandler, Get, Query } from '@storyofams/next-api-decorators'

class CoinController {
  // GET /api/coingecko

  /**
   * @swagger
   * /api/v2/coingecko:
   *   get:
   *     tags:
   *       - data-api(v2)
   *     summary: get coingecko coin info
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: coingecko coin info
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<CoinInfoData | null>
   */
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
  /**
   * @swagger
   * /api/v2/coingecko/market:
   *   get:
   *     tags:
   *       - data-api(v2)
   *     summary: get coingecko coin market info
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: coingecko coin market info
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<CoinMarketInfoData | null>
   */
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
