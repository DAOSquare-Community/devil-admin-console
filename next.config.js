/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    // any domains: https://www.akmittal.dev/posts/nextjs-image-use-any-domain/
    domains: [
      'images.unsplash.com',
      'iph.href.lu',
      'etherscan.io',
      's3-alpha-sig.figma.com',
      'daohaus.mypinata.cloud',
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    DEVIL_CONSOLE_BACKEND_URL: process.env.DEVIL_CONSOLE_BACKEND_URL,
    // GRAGHQL_BACKEND_URL: `api/graphql`,
  },
  redirects: async () => {
    return [
      {
        source: '/admin/dashboard',
        destination: '/admin',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
    ]
  },
  outputFileTracing: false,
}

module.exports = nextConfig
