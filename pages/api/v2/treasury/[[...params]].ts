// get sesh info
import { ResultMsg } from 'types/resultmsg'

import {
  createHandler,
  Get,
  InternalServerErrorException,
  Query,
} from '@storyofams/next-api-decorators'
import Treasury from 'service/treasury'
import { TreasuryToken } from 'models/TreasuryToken'
import { MsgCode } from 'types/const-enum'

class TreasuryController {
  private _treasuryService = new Treasury()

  /**
   * @swagger
   * /api/v2/treasury:
   *   get:
   *     tags:
   *       - data-api(v2)
   *     summary: get treasury info
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: treasury info
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<TreasuryData | null>
   */
  @Get()
  public async getSesh(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<TreasuryToken | null>> {
    const ret: ResultMsg<TreasuryToken | null> = {
      message: '',
      data: null,
    }
    try {
      const tt = await this._treasuryService.getTreasuryDataFormDB(daoId)
      if (tt) ret.data = tt
    } catch (err) {
      const error = err instanceof Error ? err.message : MsgCode.FAILURE
      ret.message = error
      throw new InternalServerErrorException(error)
    }
    return ret
  }
}
export default createHandler(TreasuryController)
