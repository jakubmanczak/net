/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
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
			{
				source: "/twitter",
				destination: "https://twitter.com/j4kubmanczak",
				permanent: true,
			},
			{
				source: "/source",
				destination: "https://github.com/jakubmanczak/manczak.net",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
