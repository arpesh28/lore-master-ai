import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "epic-games-store-nextjs13-drizzle-orm.vercel.app",
      },
    ],
  },
};

export default nextConfig;
