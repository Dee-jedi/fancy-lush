import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // @ts-ignore - Next.js specifically requested this in the terminal to fix workspace detection
  outputFileTracingRoot: path.join(__dirname, "../../"),
  turbopack: {}, // Required for Next.js 16 when using custom webpack config
  allowedDevOrigins: ["10.128.0.203", "10.128.0.16"],
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "framer-motion": path.resolve(__dirname, "../../node_modules/framer-motion"),
    };
    return config;
  },
};

export default nextConfig;
