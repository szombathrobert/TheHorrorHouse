import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"], // ide jön minden külső kép host, amit használni akarsz
  },
};

export default nextConfig;
