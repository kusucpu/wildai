/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'gen.pollinations.ai' },
      { protocol: 'https', hostname: 'image.pollinations.ai' },
    ],
    unoptimized: true
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
}
module.exports = nextConfig
