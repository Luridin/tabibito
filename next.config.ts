import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/tabibito",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
