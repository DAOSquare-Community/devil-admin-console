/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'iph.href.lu', 'etherscan.io'],
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
    ]
  },
  outputFileTracing: false,
}

module.exports = nextConfig
