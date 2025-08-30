import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ❌ build ကို error နဲ့ fail မဖြစ်စေချင်ရင်
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
