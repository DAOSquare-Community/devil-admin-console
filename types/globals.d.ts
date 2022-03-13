import { MeInterface } from 'types/user'
/* eslint-disable no-var */
import type { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

declare module 'next' {
  interface NextApiRequest {
    user?: MeInterface
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    user?: MeInterface
  }
}

declare module 'next-auth' {
  interface Session extends Record<string, unknown>, DefaultSession {
    user?: MeInterface
    // expires: ISODateString
  }
}
