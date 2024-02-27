/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gen3566.pythonanywhere.com',
                port: '',
                pathname: '/media/**',
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/images/S/aplus-media/sota/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        unoptimized: true,
    },
}

module.exports = nextConfig
