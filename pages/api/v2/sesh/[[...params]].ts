// get sesh info
import { ResultMsg } from 'types/resultmsg'

import {
  createHandler,
  Get,
  InternalServerErrorException,
  Query,
} from '@storyofams/next-api-decorators'
import Sesh from 'service/sesh'
import { SeshData } from 'types/models/sesh'

class SeshController {
  private _seshService = new Sesh()

  /**
   * @swagger
   * /api/v2/sesh:
   *   get:
   *     tags:
   *       - data-api(v2)
   *     summary: get sesh info
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: sesh info
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<SeshData | null>
   */
  @Get()
  public async getSesh(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<SeshData | null>> {
    const ret = await this._seshService.getSeshData(daoId)
    if (ret.message) throw new InternalServerErrorException(ret.message)
    return ret
  }
}
export default createHandler(SeshController)
