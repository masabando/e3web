import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["bmini.local", "mair.local"],
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
