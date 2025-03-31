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
  // Optimize build process
  poweredByHeader: false,
  // Disable image optimization during build to save memory
  images: {
    disableStaticImages: true,
  },
  // Optimize large dependencies
  experimental: {
    // Only include the minimal required polyfills
    optimizeCss: true,
    // Optimize server components
    serverComponentsExternalPackages: ['shiki'],
    // Workaround for memory issues
    esmExternals: 'loose',
    // More aggressive code elimination
    optimizePackageImports: ['react-syntax-highlighter', 'lucide-react', 'framer-motion'],
  },
  // Fix for dynamic imports
  webpack: (config, { isServer, dev }) => {
    // Fix for dynamic imports
    config.module.parser = {
      ...config.module.parser,
      javascript: {
        ...config.module.parser?.javascript,
        dynamicImportMode: 'eager'
      }
    };

    // Don't emit errors for dynamic imports to avoid memory consumption
    config.ignoreWarnings = [
      { module: /node_modules\/react-syntax-highlighter/ }
    ];

    // Reduce memory usage by optimizing memory usage
    if (!dev) {
      config.optimization.concatenateModules = true;
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }

    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000,
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
          name(module) {
            // Get the name of the package
            const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            if (!match) return 'vendors';
            const packageName = match[1];
            // Return a truncated name to avoid long filenames
            return `npm.${packageName.replace('@', '').split('/')[0]}`;
          },
        },
        // Special chunk for syntax highlighter
        syntaxHighlighter: {
          test: /[\\/]node_modules[\\/]react-syntax-highlighter[\\/]/,
          name: 'syntax-highlighter',
          priority: 50,
          chunks: 'all',
        },
      },
    };

    return config;
  },
};

export default bundleAnalyzer(nextConfig);
