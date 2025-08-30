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
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/static/**",
      },
    ],
  },
};

module.exports = nextConfig;

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/static/**",
//       },
//       {
//         protocol: "https",
//         hostname: "upload.wikimedia.org",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;
