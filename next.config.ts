import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  // Don't write AGENTS.md / CLAUDE.md into the repo on `next dev`.
  agentRules: false,
};

export default nextConfig;
