/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif']
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    dirs: ['src']
  }
}

module.exports = nextConfig 