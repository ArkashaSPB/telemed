/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['src/app/scss'],
    additionalData: '@use "variables" as *;'
  },
  experimental: {
    optimizeCss: false // Отключаем оптимизацию CSS для лучшего hot reload
  },
  // Отключаем кэширование для development
  ...(process.env.NODE_ENV === 'development' && {
    headers: async () => [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'Pragma', 
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      }
    ]
  })
};

export default nextConfig;
