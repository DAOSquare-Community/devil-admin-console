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
import { PageData, ResultMsg } from 'types/resultmsg'
import DaoService from 'service/dao'
import { Dao } from 'models/Dao'

@NextAuthGuard()
@OpLogGuard()
class DaoController {
  private _service = new DaoService()

  /**
   * get dao list
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
   */
  @Get('/list')
  public async getMemberList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('queryParams') queryParams?: object,
    @Query('sortParams') sortParams?: object
  ): Promise<ResultMsg<PageData<Dao>>> {
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
   * get dao by daoid
   * @Query daoid
   * @returns
   */
  @Get()
  public async getDaoByDaoId(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<Dao | null>> {
    const dao = await this._service.getEntity({ daoId })
    if (dao.message) throw new InternalServerErrorException(dao.message)
    return dao
  }

  /**
   * delete dao by filter
   * @param filter
   * @returns
   */
  @Delete()
  public async deleteDaoByFilter(
    @Body() body: { filter: string }
  ): Promise<ResultMsg<boolean>> {
    const del = await this._service.deleteEntity(JSON.parse(body.filter))
    if (del.message) {
      throw new InternalServerErrorException(del.message)
    }
    return del
  }

  /**
   * insert dao
   * @param dao
   * @returns
   */
  @Post()
  public async insertDao(@Body() body: object): Promise<ResultMsg<boolean>> {
    const dao = new Dao()
    const d = Object.assign(dao, body)
    const ret = await this._service.insertEntity(d)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * update dao
   * @param filter
   * @param update
   * @returns
   */
  @Put()
  public async updateDao(
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

export default createHandler(DaoController)
