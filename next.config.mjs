import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  // Optimize large dependencies
  experimental: {
    // Only include the minimal required polyfills
    optimizeCss: true,
    // Optimize server components
    serverComponentsExternalPackages: ['shiki'],
  },
  // Fix for dynamic imports
  webpack: (config, { isServer }) => {
    // Fix for dynamic imports
    config.module.parser = {
      ...config.module.parser,
      javascript: {
        ...config.module.parser?.javascript,
        dynamicImportMode: 'eager'
      }
    };

    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
        // Separate large dependencies into their own chunks
        framework: {
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
          priority: 40,
          chunks: 'all',
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          priority: 30,
          chunks: 'all',
        },
      },
    };

    return config;
  },
};

export default bundleAnalyzer(nextConfig);
