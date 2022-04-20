// get twitter info
import { ResultMsg } from 'types/resultmsg'

import {
  createHandler,
  Get,
  InternalServerErrorException,
  Query,
} from '@storyofams/next-api-decorators'
import Twitter from 'service/twitter'
import { TwitterData } from 'types/models/twitter'

class TwitterController {
  private _twitterService = new Twitter()

  /**
   * @swagger
   * /api/v2/twitter:
   *   get:
   *     tags:
   *       - data-api(v2)
   *     summary: get twitter info
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: twitter info
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<TwitterData | null>
   */
  @Get()
  public async getTwitter(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<TwitterData | null>> {
    const ret = await this._twitterService.getTwitterFollowersNumber(daoId)
    if (ret.message) throw new InternalServerErrorException(ret.message)
    return ret
  }
}
export default createHandler(TwitterController)
