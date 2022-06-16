/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/steam",
				destination: "https://steamcommunity.com/id/jakubmanczak",
				permanent: true,
			},
			{
				source: "/github",
				destination: "https://github.com/jakubmanczak",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
