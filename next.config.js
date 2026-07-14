/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.NEXT_DEPLOYMENT_TARGET === 'github-pages'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGitHubPages ? '/key-master' : '',
}

module.exports = nextConfig
