/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "production" ? true : false,
};

module.exports = nextConfig;
