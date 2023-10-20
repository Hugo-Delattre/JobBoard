/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: ["cdn.discordapp.com", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig
