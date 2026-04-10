/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.pollinations.ai'],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
