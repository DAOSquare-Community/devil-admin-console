/* eslint-disable no-var */

import type { Role } from './permission'
import type { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

declare module 'next' {
  interface NextApiRequest {
    user?: { name: string; role: Role; walletAddr: string }
  }
}
