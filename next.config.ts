import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com", pathname: "/img/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;