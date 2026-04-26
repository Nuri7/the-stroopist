import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/the-stroopist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
