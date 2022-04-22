import {
  Get,
  Query,
  createHandler,
  DefaultValuePipe,
  InternalServerErrorException,
} from '@storyofams/next-api-decorators'
import NextAuthGuard from 'lib/middleawares/auth'
import { LogOp } from 'models/LogOp'
import LogOpService from 'service/logop'
import { PageData, ResultMsg } from 'types/resultmsg'

@NextAuthGuard()
class LogOpController {
  private _service = new LogOpService()

  /**
   * get log list
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
   */

  /**
   * @swagger
   * /api/v2/logop/list:
   *   get:
   *     tags:
   *       - logop
   *     summary: get logop list
   *     parameters:
   *            - name: page
   *              required: false
   *              in: query
   *              type: number
   *            - name: pageSize
   *              required: false
   *              in: query
   *              type: number
   *            - name: queryParams
   *              required: false
   *              in: query
   *              type: object
   *            - name: sortParams
   *              required: false
   *              in: query
   *              type: object
   *
   *     responses:
   *       200:
   *         description: logop list
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */

  @Get('/list')
  public async getLogList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('queryParams') queryParams?: object,
    @Query('sortParams') sortParams?: object
  ): Promise<ResultMsg<PageData<LogOp>>> {
    const ret = await this._service.getList(
      page,
      pageSize,
      queryParams ?? {},
      sortParams ?? {}
    )
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * get log by id
   * @Query   id
   * @returns
   */

  /**
   * @swagger
   * /api/v2/logop:
   *   get:
   *     tags:
   *       - logop
   *     summary: get logop by Id
   *     parameters:
   *            - name: id
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: logop object
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<LogOp | null>
   */
  @Get()
  public async getLogById(
    @Query('id') id: string
  ): Promise<ResultMsg<LogOp | null>> {
    const logop = await this._service.getEntityById(id)
    //console.log(user)
    if (logop.message) {
      throw new InternalServerErrorException(logop.message)
    }
    return logop
  }
}

export default createHandler(LogOpController)
