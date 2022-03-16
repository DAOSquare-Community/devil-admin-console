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
