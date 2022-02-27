import { Dao, DaoModel } from 'models/Dao'
import { MongoError } from 'mongodb'
import MsgCode from 'types/msgcode'
import { ResultMsg } from 'types/resultmsg'

export default class DaoService {
  /**
   * get dao information by daoId
   *
   * @param daoId
   * @returns
   */
  getDaoInfo = async (daoId: string): Promise<ResultMsg<Dao | null>> => {
    const retDaoInfo: ResultMsg<Dao | null> = {}
    try {
      const daoinfo = await DaoModel.findOne<Dao>({ daoId: daoId })
      if (!!daoinfo) retDaoInfo.data = daoinfo
    } catch (err) {
      retDaoInfo.message = MsgCode.FAILURE
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
  ): Promise<ResultMsg<boolean>> => {
    const retUpdate: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await DaoModel.updateMany({ daoId: daoId }, { $set: updateData })
      retUpdate.data = true
    } catch (err) {
      console.log('updateDaoInfo--------')
      console.log(err)
      retUpdate.message = MsgCode.FAILURE
    }
    return retUpdate
  }

  /**
   * delete dao info  by daoId
   *
   * @param daoId
   * @returns
   */
  deleteDaoInfo = async (daoId: string): Promise<ResultMsg<boolean>> => {
    const retDel: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await DaoModel.deleteMany({ daoId: daoId })
      retDel.data = true
    } catch (err) {
      console.log('deleteDaoInfo--------')
      console.log(err)
      retDel.message = MsgCode.FAILURE
    }
    return retDel
  }

  /**
   * insert a dao info
   *
   * @param dao
   * @returns
   */
  insertDaoInfo = async (dao: Dao): Promise<ResultMsg<boolean>> => {
    const retInsert: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await DaoModel.create(dao)
      retInsert.data = true
    } catch (err) {
      let errmsg = ''
      if (err instanceof MongoError && err.code === 11000) {
        errmsg = MsgCode.DUPLICATE_KEY
      } else {
        errmsg = MsgCode.FAILURE
      }
      console.log('insertDaoInfo--------')
      console.log(err)
      retInsert.message = errmsg
    }
    return retInsert
  }

  /**
   * insert mutilate a dao info
   *
   * @param daos
   * @returns
   */
  insertMutilDaoInfo = async (daos: Dao[]): Promise<ResultMsg<boolean>> => {
    const retInsertMutl: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await DaoModel.insertMany(daos)
      retInsertMutl.data = true
    } catch (err) {
      let errmsg = ''
      if (err instanceof MongoError && err.code === 11000) {
        errmsg = MsgCode.DUPLICATE_KEY
      } else {
        errmsg = MsgCode.FAILURE
      }
      console.log('insertMutilDaoInfo--------')
      console.log(err)
      retInsertMutl.message = errmsg
    }
    return retInsertMutl
  }
}
