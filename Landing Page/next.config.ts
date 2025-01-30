module.exports = {
	async headers () {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://s3-eu-west-1.amazonaws.com; font-src 'self'; connect-src 'self' https://manual-case-study.herokuapp.com;",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
				],
			},
		];
	},
	async rewrites () {
		return [
			{
				source: "/api/:path*", // Proxy all requests starting with /api
				destination: "https://manual-case-study.herokuapp.com/:path*", // Forward to the external API
			},
		];
	},
	reactStrictMode: true,
};
