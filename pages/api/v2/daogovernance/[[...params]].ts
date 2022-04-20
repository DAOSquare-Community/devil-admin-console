// get Governance info in daosquare

import Governance, { GovernanceData } from 'service/governance'
import { ResultMsg } from 'types/resultmsg'

import { MsgCode } from 'types/const-enum'
import DaoService from 'service/dao'
import {
  createHandler,
  Get,
  InternalServerErrorException,
  Query,
} from '@storyofams/next-api-decorators'

class GovernanceController {
  private _daoService = new DaoService()
  // GET /api/daogovernance

  /**
   * @swagger
   * /api/v2/daogovernance:
   *   get:
   *     tags:
   *       - data-api(v2)
   *     summary: get daogovernance info
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: daogovernance info
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<GovernanceData | null>
   */
  @Get()
  public async getDaoGovernance(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<GovernanceData | null>> {
    const rmsg: ResultMsg<GovernanceData | null> = {
      message: '',
    }

    const resDao = await this._daoService.getDaoInfo(daoId)
    if (resDao.message) {
      throw new InternalServerErrorException(resDao.message)
    }
    rmsg.message = MsgCode.SUCCESS
    if (resDao.data) {
      rmsg.data = await new Governance(resDao.data).getGovernanceData()
    }
    return rmsg
  }
}
export default createHandler(GovernanceController)
