/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Image optimization for portrait + project shots.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
