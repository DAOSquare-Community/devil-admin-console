import { Dao, DaoModel } from 'models/Dao'
import { MongoError } from 'mongodb'
import MsgCode from 'types/msgcode'

export default class DaoService {
  /**
   * get dao information by daoId
   *
   * @param daoId
   * @returns
   */
  getDaoInfo = async (daoId: string): Promise<Dao | null> => {
    let retDaoInfo = null
    try {
      const daoinfo = await DaoModel.findOne<Dao>({ daoId: daoId })
      if (!!daoinfo) retDaoInfo = daoinfo
    } catch (err) {
      console.log('getDaoInfo--------')
      console.log(err)
      throw new Error(MsgCode.FAILURE)
    }
    return retDaoInfo
  }

  /**
   * update dao information
   *
   * @param daoId
   * @param updateData
   * @returns
   */
  updateDaoInfo = async (
    daoId: string,
    updateData: object
  ): Promise<boolean> => {
    let retUpdate = false
    try {
      await DaoModel.updateMany({ daoId: daoId }, { $set: updateData })
      retUpdate = true
    } catch (err) {
      console.log('updateDaoInfo--------')
      console.log(err)
      throw new Error(MsgCode.FAILURE)
    }
    return retUpdate
  }

  /**
   * delete dao info  by daoId
   *
   * @param daoId
   * @returns
   */
  deleteDaoInfo = async (daoId: string): Promise<boolean> => {
    let retDel = false
    try {
      await DaoModel.deleteMany({ daoId: daoId })
      retDel = true
    } catch (err) {
      console.log('deleteDaoInfo--------')
      console.log(err)
      throw new Error(MsgCode.FAILURE)
    }
    return retDel
  }

  //   function to<T>(promise:Promise<T>) {
  //     return promise.then(data => {
  //        return [null, data];
  //     })
  //     .catch(err => [err]); // es6的返回写法
  //  }

  /**
   * insert a dao info
   *
   * @param dao
   * @returns
   */
  insertDaoInfo = async (dao: Dao): Promise<boolean> => {
    let retInsert = false
    try {
      await DaoModel.create(dao)
      retInsert = true
    } catch (err) {
      let errmsg = ''
      if (err instanceof MongoError && err.code === 11000) {
        errmsg = MsgCode.DUPLICATE_KEY
      } else {
        errmsg = MsgCode.FAILURE
      }
      console.log('insertDaoInfo--------')
      console.log(err)
      throw new Error(errmsg)
    }
    return retInsert
  }

  /**
   * insert mutilate a dao info
   *
   * @param daos
   * @returns
   */
  insertMutilDaoInfo = async (daos: Dao[]): Promise<boolean> => {
    let retInsertMutl = false
    try {
      await DaoModel.insertMany(daos)
      retInsertMutl = true
    } catch (err) {
      let errmsg = ''
      if (err instanceof MongoError && err.code === 11000) {
        errmsg = MsgCode.DUPLICATE_KEY
      } else {
        errmsg = MsgCode.FAILURE
      }
      console.log('insertMutilDaoInfo--------')
      console.log(err)
      throw new Error(errmsg)
    }
    return retInsertMutl
  }
}
