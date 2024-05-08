/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = pwa({
  // next.js config
  reactStrictMode: process.env.NODE_ENV === "production" ? true : false,
});
