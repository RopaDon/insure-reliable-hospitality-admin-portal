/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['storage.googleapis.com'],
  },
  eslint: {
      ignoreDuringBuilds: true,
  },
  ignoreBuildErrors: true,
}

module.exports = nextConfig
