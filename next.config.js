/** @type {import('next').NextConfig} */
const normalizeBasePath = (value) => {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}` : ''
}
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH)
    : process.env.NEXT_DEPLOYMENT_TARGET === 'github-pages'
      ? '/key-master'
      : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
}

module.exports = nextConfig
