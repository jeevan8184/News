/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
        esmExternals: 'loose',
        serverComponentsExternalPackages: ["mongoose"]
    },
    images: {
        domains: [
        'res.cloudinary.com',
        'images.livemint.com',
        'media.wired.com',
        'readwrite.com',
        'cdn.vox-cdn.com',
        'ichef.bbci.co.uk',
        "*." // Add new domains as needed
        ],
        remotePatterns: [
        {
            protocol: 'https',
            hostname: '**.brightspotcdn.com',
            port: '',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: '**.bbc.co.uk',
            port: '',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**.',
        },
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**.',
        },
        // Add more patterns if needed
        ],
    },
};

export default nextConfig;
