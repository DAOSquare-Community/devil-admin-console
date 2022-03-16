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
  // GET /api/sesh
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
