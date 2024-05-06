/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', port: '', pathname: '**' },
      { protocol: 'http', hostname: '**', port: '', pathname: '**' },
    ],
    deviceSizes: [640, 750],
    minimumCacheTTL: 60,
  },
}

export default nextConfig
