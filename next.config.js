/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output mode
  output: 'standalone',
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.pollinations.ai',
      },
      {
        protocol: 'https',
        hostname: 'gen.pollinations.ai',
      }
    ],
    unoptimized: true
  },
  
  // ESLint
  eslint: {
    ignoreDuringBuilds: true
  },
  
  // TypeScript (if needed)
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
