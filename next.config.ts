import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: "/Users/yiqun/project/qollaby/qollaby-website",
  },
};

export default nextConfig;
