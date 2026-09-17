import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "http", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "*.ctfassets.net" },
      { protocol: "http", hostname: "*.ctfassets.net" },
      { protocol: "https", hostname: "**.dluxeqiq.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "downloads.ctfassets.net" },
      { protocol: "https", hostname: "admin.dluxtech.com" },
    ],

    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],

    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@mui/icons-material",
      "lodash",
    ],
  },
};

export default nextConfig;