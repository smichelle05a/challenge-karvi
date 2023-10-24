/** @type {import('next').NextConfig} */
const nextConfig = {}

const path = require('path')

module.exports = {
  images: {
    domains: ['**', 'd7mrzff3jg2ye.cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd7mrzff3jg2ye.cloudfront.net',
      }
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}

module.exports = nextConfig
