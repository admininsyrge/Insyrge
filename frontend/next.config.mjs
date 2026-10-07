/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "swiper",
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for optimized images
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.insyrge.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

