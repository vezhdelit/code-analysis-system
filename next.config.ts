import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    reactStrictMode: true,
    serverExternalPackages: ['@node-rs/argon2'],
    typescript: {},
};

export default withNextIntl(nextConfig);
