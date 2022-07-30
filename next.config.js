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
				statusCode: 307,
			},
			{
				source: "/github",
				destination: "https://github.com/jakubmanczak",
				statusCode: 307,
			},
			{
				source: "/gh",
				destination: "/github",
				statusCode: 307,
			},
			{
				source: "/twitter",
				destination: "https://twitter.com/j4kubmanczak",
				statusCode: 307,
			},
			{
				source: "/twt",
				destination: "/twitter",
				statusCode: 307,
			},
			{
				source: "/source",
				destination: "https://github.com/jakubmanczak/manczak.net",
				statusCode: 307,
			},
		];
	},
};

module.exports = nextConfig;
