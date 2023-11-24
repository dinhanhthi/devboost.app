const nextConfig = {
  // trailingSlash: true,
  poweredByHeader: false,
  transpilePackages: ['react-syntax-highlighter'],
  experimental: {
    scrollRestoration: true // not supported yet by --turbo
  },
  images: {
    domains: ['avatars.githubusercontent.com']
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    )

    return config
  }
}

export default nextConfig
