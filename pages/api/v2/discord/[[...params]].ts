// get discord info
import { ResultMsg } from 'types/resultmsg'

import {
  createHandler,
  Get,
  InternalServerErrorException,
  Query,
} from '@storyofams/next-api-decorators'
import Discord from 'service/discord'
import { DiscordData } from 'types/models/discord'

class DiscordController {
  private _discordService = new Discord()
  // GET /api/discord

  /**
   * @swagger
   * /api/v2/discord:
   *   get:
   *     tags:
   *       - data-api(v2)
   *     summary: get discord info
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: discord info
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<DiscordData | null>
   */
  @Get()
  public async getDiscord(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<DiscordData | null>> {
    const ret = await this._discordService.getDiscordData(daoId)
    if (ret.message) throw new InternalServerErrorException(ret.message)
    return ret
  }
}
export default createHandler(DiscordController)
