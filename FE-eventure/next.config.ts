import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/public/uploads/**",
      },
    ],
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
