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
   * get config list
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
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
   * get user by name
   * @Query name
   * @returns
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
   * delete config by filter
   * @param filter
   * @returns
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
