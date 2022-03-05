import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    postHanler(req, res)
  } else {
    res.status(405).end('Method Not Allowed')
  }
}

const postHanler = async (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) => {
  try {
    return res.status(200).json({ id: 1 })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).end(error.message)
    }
  }
}
