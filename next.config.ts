// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.etsystatic.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org", // a Movie API képekhez
      },
      {
        protocol: "https",
        hostname: 'hypixel.net'
      }
    ],
  },
};

module.exports = nextConfig;
