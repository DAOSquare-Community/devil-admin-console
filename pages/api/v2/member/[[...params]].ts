import DaoService from 'service/dao'
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
import MemberService from 'service/member'
import { Member } from 'models/Member'
import { Dao } from 'models/Dao'

@NextAuthGuard()
@OpLogGuard()
class MemberController {
  private _service = new MemberService()

  /**
   * get member list
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
   */
  /**
   * @swagger
   * /api/v2/member/list:
   *   get:
   *     tags:
   *       - member
   *     summary: get member list
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
   *         description: member list
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<PageData<Member>>
   */
  @Get('/list')
  public async getMemberList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('queryParams') queryParams?: object,
    @Query('sortParams') sortParams?: object
  ): Promise<ResultMsg<PageData<Member>>> {
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
   * get member by filter
   * @Query filter
   * @returns
   * @example
   * filter={'wallet_address':'34524654356'}
   */

  /**
   * @swagger
   * /api/v2/member:
   *   get:
   *     tags:
   *       - member
   *     summary: get member by filter
   *     parameters:
   *            - name: filter
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: member object
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<Member[] | null>
   */
  @Get()
  public async getMemberByAddr(
    @Query('filter') filter: string
  ): Promise<ResultMsg<Member[] | null>> {
    const members = await this._service.getEntities(JSON.parse(filter))
    if (members.message) throw new InternalServerErrorException(members.message)
    return members
  }

  /**
   * delete member by filter
   * @param filter
   * @returns
   */
  /**
   * @swagger
   * /api/v2/member:
   *   delete:
   *     tags:
   *       - member
   *     summary: delete member by filter
   *     parameters:
   *            - name: filter
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: delete member
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Delete()
  public async deleteMemberByFilter(
    @Body() body: { filter: string }
  ): Promise<ResultMsg<boolean>> {
    const del = await this._service.deleteEntity(JSON.parse(body.filter))
    if (del.message) {
      throw new InternalServerErrorException(del.message)
    }
    return del
  }

  /**
   * insert member
   * @param member
   * @returns
   */
  /**
   * @swagger
   * /api/v2/member:
   *   post:
   *     tags:
   *       - member
   *     summary: insert a member
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: insert a member
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Post()
  public async insertMember(@Body() body: object): Promise<ResultMsg<boolean>> {
    const member = new Member()
    const m = Object.assign(member, body)
    const ret = await this._service.insertEntity(m)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * update member
   * @param filter
   * @param update
   * @returns
   */
  /**
   * @swagger
   * /api/v2/member:
   *   put:
   *     tags:
   *       - member
   *     summary: update member
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: update member
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Put()
  public async updateMember(
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

  /**
   * @swagger
   * /api/v2/member/daos:
   *   get:
   *     tags:
   *       - member
   *     summary: get member belong to daos by member addr
   *     parameters:
   *            - name: addr
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: belong to daos
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<Dao[] | null>
   */
  @Get('/daos')
  public async getDaosByMemberAddr(
    @Query('addr') addr: string
  ): Promise<ResultMsg<Dao[] | null>> {
    const ret: ResultMsg<Dao[] | null> = {}
    const member = await this._service.getEntity({ wallet_address: addr })
    if (member.message) throw new InternalServerErrorException(member.message)
    if (member.data) {
      const daoIds: string[] = member.data.daos
      let daos: Dao[] = []
      const retDaos = await new DaoService().getEntities(
        { daoId: { $in: daoIds } },
        { open_api: 0 }
      )
      if (retDaos.message)
        throw new InternalServerErrorException(retDaos.message)
      if (retDaos.data) daos = retDaos.data
      ret.data = daos
    }
    return ret
  }
}

export default createHandler(MemberController)
