/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'iph.href.lu', 'etherscan.io'],
  },
  env: {
    DEVIL_CONSOLE_BACKEND_URL: 'api',
    GRAGHQL_BACKEND_URL: `api/graphql`,
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
