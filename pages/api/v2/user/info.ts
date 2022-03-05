// get Governance info in daosquare
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { ResultMsg } from 'types/resultmsg'

import { User } from 'models/User'
import MsgCode from 'types/msgcode'
import UserService from 'service/user'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultMsg>
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  let rmsg: ResultMsg = {
    message: '',
  }

  try {
    const userSerevice = new UserService()
    switch (req.method?.toUpperCase()) {
      case 'GET':
        rmsg = await getUser(req, userSerevice)
        break
      case 'POST':
        rmsg = await insertUser(req, userSerevice)
        break
      case 'PUT':
        rmsg = await updateUser(req, userSerevice)
        break
      case 'DELETE':
        rmsg = await delUser(req, userSerevice)
        break
      default:
        break
    }
    if (!rmsg.message) {
      return res.status(500).json(rmsg)
    } else {
      return res.status(200).json(rmsg)
    }
  } catch (err) {
    if (err instanceof Error) {
      rmsg.message = err.message
    } else {
      rmsg.message = MsgCode.FAILURE
    }
    return res.status(500).json(rmsg)
  }
}

const getUser = async (req: NextApiRequest, userService: UserService) => {
  const { walletAddr } = req.query
  return userService.getUser(walletAddr as string)
}

const updateUser = async (req: NextApiRequest, userService: UserService) => {
  const { walletAddr, userModel } = req.query
  const jsonUserModel = JSON.parse(userModel as string)

  // TODO: need to parse to class
  const user = <User>jsonUserModel
  const updateData = {
    last_update_at: new Date(),
    role: user.role,
  }
  return userService.updateUser(walletAddr as string, updateData)
}

const insertUser = async (req: NextApiRequest, userService: UserService) => {
  const { userModel } = req.query
  const jsonUserModel = JSON.parse(userModel as string)

  // TODO: need to parse to class
  const user = <User>jsonUserModel
  const date = new Date()
  user.create_at = user.last_update_at = date
  user.last_loginTime = user.session_expired = null
  user.session_token = ''
  return userService.insertUser(user)
}

const delUser = async (req: NextApiRequest, userService: UserService) => {
  const { walletAddr } = req.query
  return userService.deleteUser(walletAddr as string)
}
