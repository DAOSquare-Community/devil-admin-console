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
  // GET /api/twitter
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
