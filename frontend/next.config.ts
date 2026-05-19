/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "herstories-backend.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "herstories-media.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};
module.exports = nextConfig;
