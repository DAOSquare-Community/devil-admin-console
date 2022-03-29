import {
  createHandler,
  ForbiddenException,
  Post,
  Req,
} from '@storyofams/next-api-decorators'
import { NextApiRequest, NextApiResponse } from 'next'

class CronController {
  // GET /api/cron/try
  @Post()
  public async executeCorn(@Req() req: NextApiRequest) {
    return { success: true }
  }
}
export default createHandler(CronController)
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     try {
//       const { authorization } = req.headers
//       if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
//         res.status(200).json({ success: true })
//       } else {
//         throw new Error('Fetch error')
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         res.status(500).json({ message: err.message })
//       }
//     }
//   } else {
//     res.setHeader('Allow', 'POST')
//     res.status(405).end('Method Not Allowed')
//   }
// }
