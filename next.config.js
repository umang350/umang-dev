/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.jsdelivr.net', 'i.ytimg.com']
  },
  i18n: {
    // The locales you want to support in your app
    locales: ["en", "ja"],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
  },
}

const withPWA = require("next-pwa")({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  scope: '/',
});

module.exports = withPWA({
  ...nextConfig
});