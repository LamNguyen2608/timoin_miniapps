/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["src/*"],
    },
  },
};

module.exports = nextConfig;
