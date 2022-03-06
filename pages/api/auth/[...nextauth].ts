import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'

// TODO: https://github.dev/Linch1/Web3NextjsAuth

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
})
