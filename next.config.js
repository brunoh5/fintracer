/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'github.com',
			},
		],
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
}

module.exports = nextConfig
