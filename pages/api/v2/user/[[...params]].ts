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
import { User } from 'models/User'
import UserService from 'service/user'
import { Role } from 'types/permission'
import { PageData, ResultMsg } from 'types/resultmsg'

type UserIds = {
  userIds: string[]
}

@NextAuthGuard()
@OpLogGuard()
class UserController {
  private _service = new UserService()

  /**
   * get user list
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
   */
  @Get('/list')
  public async getUserList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('queryParams') queryParams?: object,
    @Query('sortParams') sortParams?: object
  ): Promise<ResultMsg<PageData<User>>> {
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
   * get user by id
   * @Query   id
   * @returns
   */
  @Get()
  public async getUserById(
    @Query('id') id: string
  ): Promise<ResultMsg<User | null>> {
    const user = await this._service.getEntityById(id)
    //console.log(user)
    if (user.message) {
      throw new InternalServerErrorException(user.message)
    }
    return user
  }

  /**
   * delete users by ids
   * @param Ids
   * @returns
   */
  @Delete()
  public async deleteUsersByIds(
    @Body() body: UserIds
  ): Promise<ResultMsg<boolean>> {
    const delUsers = await this._service.deleteEntityByIds(body.userIds)
    if (delUsers.message) {
      throw new InternalServerErrorException(delUsers.message)
    }
    return delUsers
  }

  /**
   * insert user
   * @param user
   * @returns
   * @example
   * {
      "wallet_address" : "0xb9D8956d1290ee0818923ed5545c910FC8766666",
      "role" : ["super-admin","admin"]
     }
   */
  @Post()
  public async insertUser(@Body() body: object): Promise<ResultMsg<boolean>> {
    const user = new User()
    const u = Object.assign(user, body)
    const ret = await this._service.insertEntity(u)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * update user
   * @param filter
   * @param update
   * @returns
   */
  @Put()
  public async updateUser(
    @Body() body: { filter: { _id: string }; update: { role: Role[] } }
  ): Promise<ResultMsg<boolean>> {
    const ret = await this._service.updateEntity(body.filter, body.update)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }
}

export default createHandler(UserController)
