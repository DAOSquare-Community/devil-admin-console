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
import { ResultMsg } from 'types/resultmsg'
import DaoService from 'service/dao'
import { Dao } from 'models/Dao'
import axios from 'axios'

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

  /**
   * @swagger
   * /api/v2/dao/list:
   *   get:
   *     tags:
   *       - dao
   *     summary: get dao list
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
   *         description: dao list
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<PageData<Dao>>
   */
  @Get('/list')
  public async getDaoList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('filters') filters?: string,
    @Query('sortBy') sortBy?: string
  ) {
    try {
      return await this._service.getList(
        page,
        pageSize,
        filters ? JSON.parse(filters) : {},
        sortBy ? JSON.parse(sortBy) : {}
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message)
      }
    }
  }

  /**
   * get dao by daoid
   * @Query daoid
   * @returns
   */
  /**
   * @swagger
   * /api/v2/dao:
   *   get:
   *     tags:
   *       - dao
   *     summary: get dao by daoid
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: dao object
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<Dao | null>
   */
  @Get()
  public async getDaoByDaoId(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<Dao | null>> {
    const dao = await this._service.getEntity({ daoId })
    if (dao.message) throw new InternalServerErrorException(dao.message)
    return dao
  }

  @Get('/dkp')
  public async getDkpByDaoId(@Query('daoId') daoId: string) {
    const data = { dkp1: 0, dkp2: 0, dkp3: 0 }
    if (daoId.toLowerCase() === 'daosquare') {
      const urlParmas = ['0', '1', '2']
      const list = await Promise.all(
        urlParmas.map((r) =>
          axios
            .get(`http://47.241.24.129:3000/user/sumdkp/${r}`)
            .then((r) => r.data)
        )
      )
      data.dkp1 = list[0].sum
      data.dkp2 = list[1].sum
      data.dkp3 = list[2].sum

      return data
    }
    return data
  }

  /**
   * delete dao by filter
   * @param filter
   * @returns
   */

  /**
   * @swagger
   * /api/v2/dao:
   *   delete:
   *     tags:
   *       - dao
   *     summary: delete dao by filter
   *     parameters:
   *            - name: filter
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: delete dao
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
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

  /**
   * @swagger
   * /api/v2/dao:
   *   post:
   *     tags:
   *       - dao
   *     summary: insert a dao
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: insert a dao
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
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

  /**
   * @swagger
   * /api/v2/dao:
   *   put:
   *     tags:
   *       - dao
   *     summary: update dao
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: update dao
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Put()
  public async updateDao(
    @Body() body: { filter: object; update: object }
  ): Promise<ResultMsg<boolean>> {
    const ret = await this._service.updateEntity(body.filter, body.update)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }
}

export default createHandler(DaoController)
