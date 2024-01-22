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
	webpack: (config, { isServer }) => {
		if (isServer) {
			if (Array.isArray(config.resolve.alias)) {
				config.resolve.alias.push({ name: 'msw/browser', alias: false })
			} else {
				config.resolve.alias['msw/browser'] = false
			}
		} else {
			if (Array.isArray(config.resolve.alias)) {
				config.resolve.alias.push({ name: 'msw/node', alias: false })
			} else {
				config.resolve.alias['msw/node'] = false
			}
		}
		return config
	},
	// productionBrowserSourceMaps: false,
	// optimizeFonts: false,
}

module.exports = nextConfig
