/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export in production, not development (Keystatic needs server APIs)
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
