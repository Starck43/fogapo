const path = require('path')

module.exports = {
	env: {
		API_SERVER: process.env.NEXT_PUBLIC_SERVER + '/api',
		API_ENDPOINTS: {
				posts: '/posts',
				postsGrouped: '/posts/grouped',
				latest: '/posts/latest',
				saveUser: '/user/add',
			},
	},
	publicRuntimeConfig: {},
	serverRuntimeConfig: {
		// Will only be available on the server side
		// mySecret: 'secret',
		// secondSecret: process.env.SECOND_SECRET, // Pass through env variables
	},
	images: {
		domains: ['localhost', process.env.NEXT_PUBLIC_SERVER_HOST],
	},
	compiler: {
		// ssr and displayName are configured by default
		styledComponents: {
			displayName: true,
			ssr: false,
		},
		relay: {
			src: "./",
			artifactDirectory: "./__generated__",
			//language: "typescript",
		},
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	eslint: {
		dirs: ["pages", "core", "components"],
	},
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.('.svg'),
		)

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				resourceQuery: { not: /url/ }, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			},
		)

		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
}
