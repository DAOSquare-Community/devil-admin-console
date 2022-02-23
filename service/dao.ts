import { DAO } from 'types/dao/dao'
import DB from 'lib/db/mongodb'

const DAOSquareInfo: DAO = {
  open_api: {
    dework: { orgId: '5T2WcpGDJ3m6cOiG5ItJeL' },
    discord: { channelId: '941665725112782868' },
    twitter: { twitterId: 'DAOSquare' },
    sesh: {
      access_token: '9xbD4YkcTJ22SQZy55CJzMfncII0X6',
      guild_id: '678414857510453309',
    },
  },
} as DAO

const db: DB = DB.getInstance() as DB
const COLLECTION_NAME = 'dao'

/**
 * get dao information by daoId
 *
 * @param daoId
 * @returns
 */
const getDaoInfo = async (daoId: string) => {
  const daoinfo: DAO[] = (await db.find<DAO>(COLLECTION_NAME, {
    daoId: `${daoId}`,
  })) as DAO[]
  return daoinfo
}

/**
 * update dao information
 *
 * @param daoId
 * @param updateData
 * @returns
 */
const updateDaoInfo = async (daoId: string, updateData: DAO) => {
  const result = await db.update<DAO>(
    COLLECTION_NAME,
    {
      daoId: `${daoId}`,
    },
    { $set: updateData }
  )
  return result
}

/**
 * delete dao info  by daoId
 *
 * @param daoId
 * @returns
 */
const deleteDaoInfo = async (daoId: string) => {
  const delRes = await db.delete<DAO>(COLLECTION_NAME, {
    daoId: `${daoId}`,
  })
  return delRes
}

/**
 * insert a dao info
 *
 * @param dao
 * @returns
 */
const insertDaoInfo = async (dao: DAO) => {
  const insertRes = await db.insert<DAO>(COLLECTION_NAME, dao)
  return insertRes
}

/**
 * insert mutilate a dao info
 *
 * @param daos
 * @returns
 */
const insertMutilDaoInfo = async (daos: DAO[]) => {
  const insertMutilRes = await db.insertMany<DAO>(COLLECTION_NAME, daos)
  return insertMutilRes
}

// const getDaoInfoFromId = async (daoId: string) => {
//   return DAOSquareInfo
// }

export {
  getDaoInfo,
  updateDaoInfo,
  deleteDaoInfo,
  insertDaoInfo,
  insertMutilDaoInfo,
}
