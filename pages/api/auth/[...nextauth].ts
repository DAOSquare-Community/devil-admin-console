import UserService from 'service/user'
import { ResultMsg } from 'types/resultmsg'
import {
  BadRequestException,
  Get,
  InternalServerErrorException,
  Param,
} from '@storyofams/next-api-decorators'
import NextAuth from 'next-auth'
import { UserNonceCache } from 'lib/config'
import Web3Auth from 'lib/web3Auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Role } from 'types/permission'
import { User } from 'models/User'
import { MeInterface } from 'types/user'

// TODO: https://github.dev/Linch1/Web3NextjsAuth
// : Awaitable<(Omit<UserToken, 'id'> | { id?: string }) | null>
// req: Pick<IncomingRequest, 'headers' | 'body' | 'query' | 'method'>

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        address: { label: 'address', type: 'text', placeholder: '' },
        signature: { label: 'signature', type: 'password' },
      },
      authorize: async (
        credentials: Record<string, string> | undefined
      ): Promise<MeInterface> => {
        const address = credentials?.address
        const signature = credentials?.signature

        //console.log(`address:${address}`)
        //console.log(`signature:${signature}`)

        if (!address || !signature)
          throw new BadRequestException('Missing address or signature')

        // Step 1: Get the user nonce with the given publicAddress
        const nonce = UserNonceCache.get(address)
        //console.log(`nonce:${nonce}`)
        if (!nonce)
          throw new InternalServerErrorException(
            `User with publicAddress ${address} is not found in database`
          )
        // Step 2: Verify digital signature
        if (!Web3Auth.verifySignature(address, nonce, signature))
          throw new BadRequestException('Signature verification failed')

        //console.log(`UserNonceCache:${UserNonceCache}`)
        // Step 3: update nonce for the user
        // const newNonce = Web3Auth.getNonce()
        UserNonceCache.put(address, '')

        // Step 4: Create JWT
        let user = new User()
        const retMsg = await new UserService().getUser(address)
        if (retMsg.message)
          throw new InternalServerErrorException(retMsg.message)

        // create User
        if (!retMsg.data || !retMsg.data.wallet_address) {
          user.wallet_address = address
          user.role = ['member']
          user.create_at =
            user.last_update_at =
            user.last_loginTime =
              new Date()
          user.last_loginTime = null
          user.session_expired = null
          user.session_token = ''
        } else {
          user = retMsg.data as User
        }
        //console.log(`user:${JSON.stringify(user)}`)
        const ut: MeInterface = {
          avatar: '',
          email: '',
          joinDate: '',
          name: user.wallet_address,
          roles: user.role as Role[],
          title: '',
          id: user._id ?? '',
        }
        //console.log(`ut:${JSON.stringify(ut)}`)
        //const user1 = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        return ut
      },
      type: 'credentials',
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 30 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user
      return session
    },
    async jwt({ token, user }) {
      if (user) token.user = user as unknown as MeInterface
      return token
    },
  },
})
