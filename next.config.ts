import type { NextConfig } from "next";

const android = process.env.CAPACITOR === "1";

const nextConfig: NextConfig = {
  ...(android
    ? { output: "export", trailingSlash: true }
    : { cacheComponents: true, partialPrefetching: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
