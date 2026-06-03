import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: ["10.128.0.203", "10.128.0.16", "10.74.222.16"],
};

export default nextConfig;
