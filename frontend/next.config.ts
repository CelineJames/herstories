// import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "herstories-backend.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
