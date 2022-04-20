import { MsgCode } from 'types/const-enum'
import {
  Get,
  Query,
  createHandler,
  DefaultValuePipe,
  InternalServerErrorException,
  Delete,
  Post,
  Put,
  Body,
} from '@storyofams/next-api-decorators'
import NextAuthGuard from 'lib/middleawares/auth'
import OpLogGuard from 'lib/middleawares/oplog'
import { Config } from 'models/Config'
import ConfigService from 'service/config'
import { PageData, ResultMsg } from 'types/resultmsg'

@NextAuthGuard()
@OpLogGuard()
class ConfigController {
  private _service = new ConfigService()

  /**
   * @swagger
   * /api/v2/sysconfig/list:
   *   get:
   *     tags:
   *       - config
   *     summary: get config list
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
   *         description: config list
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<PageData<Config>>
   */
  @Get('/list')
  public async getConfigList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('queryParams') queryParams?: object,
    @Query('sortParams') sortParams?: object
  ): Promise<ResultMsg<PageData<Config>>> {
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
   * @swagger
   * /api/v2/sysconfig:
   *   get:
   *     tags:
   *       - config
   *     summary: get config by name
   *     parameters:
   *            - name: name
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: config object
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<Config | null>
   */
  @Get()
  public async getConfigByName(
    @Query('name') name: string
  ): Promise<ResultMsg<Config | null>> {
    const config: ResultMsg<Config | null> = {
      message: '',
      data: null,
    }
    try {
      const cfg = await this._service.getConfigByName(name)
      config.data = cfg
    } catch (err) {
      const error = err instanceof Error ? err.message : MsgCode.FAILURE
      config.message = error
      throw new InternalServerErrorException(error)
    }

    return config
  }

  /**
   * @swagger
   * /api/v2/sysconfig:
   *   delete:
   *     tags:
   *       - config
   *     summary: delete config by filter
   *     parameters:
   *            - name: filter
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: delete config
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Delete()
  public async deleteConfigByFilter(
    @Body() body: { filter: string }
  ): Promise<ResultMsg<boolean>> {
    const del = await this._service.deleteEntity(JSON.parse(body.filter))
    if (del.message) {
      throw new InternalServerErrorException(del.message)
    }
    return del
  }

  /**
   * insert config
   * @param config
   * @returns
   */
  /**
   * @swagger
   * /api/v2/sysconfig:
   *   post:
   *     tags:
   *       - config
   *     summary: insert a config
   *     parameters:
   *            - name: config
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: insert a config
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Post()
  public async insertConfig(@Body() body: object): Promise<ResultMsg<boolean>> {
    const config = new Config()
    const cfg = Object.assign(config, body)
    const ret = await this._service.insertEntity(cfg)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * update config
   * @param filter
   * @param update
   * @returns
   */
  /**
   * @swagger
   * /api/v2/sysconfig:
   *   put:
   *     tags:
   *       - config
   *     summary: update config
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: update config
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Put()
  public async updateConfig(
    @Body() body: { filter: string; update: string }
  ): Promise<ResultMsg<boolean>> {
    const ret = await this._service.updateEntity(
      JSON.parse(body.filter),
      JSON.parse(body.update)
    )
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }
}

export default createHandler(ConfigController)
