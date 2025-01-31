import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
        serverActions: {
            bodySizeLimit: '25mb'
        }
    },
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com"
            }
        ]
    }
};

export default nextConfig;
