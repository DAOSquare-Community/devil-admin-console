/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */

import type { Role } from './permission'
import type { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient>
  interface Window {
    web3: any
    ethereum: any
    Web3Modal: any
    [name: string]: any
  }
}

declare module 'next' {
  interface NextApiRequest {
    user?: { name: string; role: Role; walletAddr: string }
  }
}

