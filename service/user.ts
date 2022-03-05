import { MongoError } from 'mongodb'
import MsgCode from 'types/msgcode'
import { ResultMsg } from 'types/resultmsg'
import { User, UserModel } from './../models/User'

export default class UserService {
  /**
   * get user entity by walletAddr
   *
   * @param walletAddr
   * @returns
   */
  getUser = async (walletAddr: string): Promise<ResultMsg<User | null>> => {
    const retUser: ResultMsg<User | null> = {}
    try {
      const userInfo = await UserModel.findOne<User>({
        wallet_address: walletAddr,
      })
      if (!!userInfo) retUser.data = userInfo
    } catch (err) {
      retUser.message = MsgCode.FAILURE
    }
    return retUser
  }

  /**
   * update user entity
   *
   * @param walletAddr
   * @param updateData
   * @returns
   */
  updateUser = async (
    walletAddr: string,
    updateData: object
  ): Promise<ResultMsg<boolean>> => {
    const retUpdate: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await UserModel.updateMany(
        { wallet_address: walletAddr },
        { $set: updateData }
      )
      retUpdate.data = true
    } catch (err) {
      console.log('updateUser--------')
      console.log(err)
      retUpdate.message = MsgCode.FAILURE
    }
    return retUpdate
  }

  /**
   * delete user entity
   *
   * @param walletAddr
   * @returns
   */
  deleteUser = async (walletAddr: string): Promise<ResultMsg<boolean>> => {
    const retDel: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await UserModel.deleteMany({ wallet_address: walletAddr })
      retDel.data = true
    } catch (err) {
      console.log('deleteUser--------')
      console.log(err)
      retDel.message = MsgCode.FAILURE
    }
    return retDel
  }

  /**
   * insert a user
   *
   * @param user
   * @returns
   */
  insertUser = async (user: User): Promise<ResultMsg<boolean>> => {
    const retInsert: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await UserModel.create(user)
      retInsert.data = true
    } catch (err) {
      let errmsg = ''
      if (err instanceof MongoError && err.code === 11000) {
        errmsg = MsgCode.DUPLICATE_KEY
      } else {
        errmsg = MsgCode.FAILURE
      }
      console.log('insertUser--------')
      console.log(err)
      retInsert.message = errmsg
    }
    return retInsert
  }

  /**
   * insert mutilate users
   *
   * @param users
   * @returns
   */
  insertUsers = async (users: User[]): Promise<ResultMsg<boolean>> => {
    const retInsertMutl: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await UserModel.insertMany(users)
      retInsertMutl.data = true
    } catch (err) {
      let errmsg = ''
      if (err instanceof MongoError && err.code === 11000) {
        errmsg = MsgCode.DUPLICATE_KEY
      } else {
        errmsg = MsgCode.FAILURE
      }
      console.log('insertUsers--------')
      console.log(err)
      retInsertMutl.message = errmsg
    }
    return retInsertMutl
  }
}
