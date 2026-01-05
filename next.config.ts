import type {NextConfig} from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const isDeploy = process.env.DEPLOY === 'true';

// Get the repository name from environment, default to empty string for localhost
const repoName = process.env.NEXT_PUBLIC_REPO_NAME || '';
const basePath = isDeploy && repoName ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
