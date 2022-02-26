import { Dao, DaoModel } from 'models/Dao'

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
      const daoinfo = await DaoModel.find({ daoId: daoId })
      if (!!daoinfo && Array.isArray(daoinfo) && daoinfo.length > 0)
        retDaoInfo = daoinfo[0] as Dao
    } catch (err) {
      console.log('getDaoInfo--------')
      console.log(err)
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
  updateDaoInfo = async (daoId: string, updateData: object) => {
    let retDaoInfo = null
    try {
      retDaoInfo = await DaoModel.updateMany(
        { daoId: daoId },
        { $set: updateData }
      )
    } catch (err) {
      console.log('updateDaoInfo--------')
      console.log(err)
    }
    return retDaoInfo
    // const result = await db.update<DAO>(
    //   COLLECTION_NAME,
    //   {
    //     daoId: `${daoId}`,
    //   },
    //   { $set: updateData }
    // )
    //return result
  }

  /**
   * delete dao info  by daoId
   *
   * @param daoId
   * @returns
   */
  deleteDaoInfo = async (daoId: string) => {
    let retDel = null
    try {
      retDel = await DaoModel.deleteMany({ daoId: daoId })
    } catch (err) {
      console.log('deleteDaoInfo--------')
      console.log(err)
    }
    return retDel
  }

  /**
   * insert a dao info
   *
   * @param dao
   * @returns
   */
  insertDaoInfo = async (dao: Dao) => {
    let retInsert = null
    try {
      retInsert = await DaoModel.create(dao)
    } catch (err) {
      console.log('insertDaoInfo--------')
      console.log(err)
    }
    return retInsert
  }

  /**
   * insert mutilate a dao info
   *
   * @param daos
   * @returns
   */
  insertMutilDaoInfo = async (daos: Dao[]) => {
    let retInsertMutl = null
    try {
      retInsertMutl = await DaoModel.insertMany(daos)
    } catch (err) {
      console.log('insertMutilDaoInfo--------')
      console.log(err)
    }
    return retInsertMutl
  }
}
