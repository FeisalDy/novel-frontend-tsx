/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'qidian.qpic.cn',
                port: ''
            }
        ]
    }
}

module.exports = nextConfig
