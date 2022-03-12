import { UserType } from 'types/user'
/* eslint-disable no-var */
import type { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

declare module 'next' {
  interface NextApiRequest {
    user?: UserType
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    user?: UserType
  }
}
