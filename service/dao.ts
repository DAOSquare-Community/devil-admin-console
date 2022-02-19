import { LogOp } from 'types/dao/dao'

const DAOSquareInfo: LogOp = {
  open_api: {
    dework: { orgId: '5T2WcpGDJ3m6cOiG5ItJeL' },
    discord: { channelId: '941665725112782868' },
    sesh: {
      access_token: '9xbD4YkcTJ22SQZy55CJzMfncII0X6',
      guild_id: '678414857510453309',
    },
  },
} as LogOp

const getDaoInfoFromId = async (daoId: string) => {
  return DAOSquareInfo
}

export { getDaoInfoFromId }
