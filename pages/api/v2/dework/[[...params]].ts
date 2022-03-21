import { MsgCode } from 'types/const-enum'
// get dework info
import { ResultMsg } from 'types/resultmsg'

import {
  createHandler,
  Get,
  InternalServerErrorException,
  Query,
} from '@storyofams/next-api-decorators'
import Dework from 'service/dework'
import { DeworkData } from 'types/models/dework'

class DeworkController {
  private _DeworkService = new Dework()
  // GET /api/dework
  @Get()
  public async getDiscord(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<DeworkData | null>> {
    const ret: ResultMsg<DeworkData | null> = {
      message: '',
      data: null,
    }

    try {
      ret.data = await this._DeworkService.getDeworkData(daoId)
    } catch (err) {
      ret.message = err instanceof Error ? err.message : MsgCode.FAILURE
    }

    if (ret.message) throw new InternalServerErrorException(ret.message)
    return ret
  }
}
export default createHandler(DeworkController)
