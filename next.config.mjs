/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export in production, not development (Keystatic needs server APIs)
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  // Include dev-only files in development, exclude in production
  pageExtensions: process.env.NODE_ENV === 'development' 
    ? ['tsx', 'ts', 'jsx', 'js', 'dev.tsx', 'dev.ts', 'dev.jsx', 'dev.js']
    : ['tsx', 'ts', 'jsx', 'js'],
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
