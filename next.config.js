const config = require("./data/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	async redirects() {
		return config.links
			.filter((link) => !!link.hrefalias)
			.map((link) =>
				link.hrefalias.map((source) => ({
					source,
					destination: link.href,
					permanent: false,
				}))
			)
			.flat();
	},
};

module.exports = nextConfig;
