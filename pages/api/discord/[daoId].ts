import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
import DaoService from 'service/dao'
import { OpenApi } from 'models/Dao'

type Data = {
  organization: {
    task: { id: string; status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' }[]
  }
}
const authorization = process.env.DISCORD_BOT_TOKEN ?? ''

// 941665725112782868
const fetchDiscordData = async (daoId: string) => {
  const dao = await new DaoService().getDaoInfo(daoId)
  if (!dao.message) {
    const channelId = (dao.data?.open_api as OpenApi).discord?.channelId
    if (!!channelId?.length) {
      return request<Data>({
        url: `https://discord.com/api/guilds/${channelId}?with_counts=true`,
        method: 'get',
        headers: {
          Authorization: authorization,
        },
      })
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    getHanler(req, res)
  } else {
    res.status(405).end('Method Not Allowed')
  }
}

const getHanler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { daoId } = req.query
  try {
    if (typeof daoId === 'string') {
      const data = await fetchDiscordData(daoId)
      if (!!data) {
        res.status(200).json(data)
      } else {
        throw new Error('Fetch error')
      }
    } else {
      throw new Error('Require daoId')
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).end(error.message)
    }
  }
}
