import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
type Data = {
  organization: {
    task: { id: string; status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' }[]
  }
}
// 941665725112782868
const fetchDiscordData = async (daoId: string) => {
  const channelId = '941665725112782868'
  return request({
    url: `https://discord.com/api/guilds/${channelId}?with_counts=true`,
    method: 'get',
    headers: {
      Authorization:
        'Bot OTM5NTIxODE5MzEwOTYwNzMw.Yf6D4Q.lyvBMOiHrN5YV4GSqPIbaYJHbbk',
    },
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { daoId } = req.query
  if (typeof daoId === 'string') {
    const data = await fetchDiscordData(daoId)
    res.status(200).json(data)
  }

  res.status(500)
}
