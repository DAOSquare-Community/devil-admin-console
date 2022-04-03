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
import { PageData, ResultMsg } from 'types/resultmsg'
import MemberService from 'service/member'
import { Member } from 'models/Member'

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
   * get member by name
   * @Query name
   * @returns
   * @example
   * filter={'wallet_address':'34524654356'}
   */
  @Get()
  public async getMemberByAddr(
    @Query('filter') filter: string
  ): Promise<ResultMsg<Member | null>> {
    const member = await this._service.getEntity(JSON.parse(filter))
    if (member.message) throw new InternalServerErrorException(member.message)
    return member
  }

  /**
   * delete member by filter
   * @param filter
   * @returns
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
   * @param config
   * @returns
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
}

export default createHandler(MemberController)
