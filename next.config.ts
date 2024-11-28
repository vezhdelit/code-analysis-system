import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    serverExternalPackages: ['@node-rs/argon2'],
    typescript: {},
};

export default nextConfig;
