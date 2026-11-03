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
  async redirects() {
    return [
      // The Videos page is gone; the YouTube carousel on the homepage replaces it.
      {
        source: '/videos',
        destination: '/',
        permanent: true,
      },
      // The Anaplan Toolkit store listings link to the old privacy policy URL.
      {
        source: '/privacy/anaplan-toolkit',
        destination: '/anaplan/toolkit/privacy',
        permanent: true,
      },
    ]
  },
}

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});


module.exports = nextConfig
