/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
    @import "@Styles/_tools.scss";
    @import "@Styles/_setting.scss";
   `,
  },
}

module.exports = nextConfig
