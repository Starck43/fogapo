const path = require('path')
const isProduction = process.env.NODE_ENV === "production"
const serverName = isProduction ? 'https://admin.fogapo.ru' : 'http://localhost:8002'

module.exports = {
	env: {
		SERVER: serverName,
		API_SERVER: serverName + '/api',
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
			domains: [serverName],
			//deviceSizes: [320, 576, 768, 992, 1200, 1400, 1920], // breakpoints
			//imageSizes: [320, 450, 640, 900, 1200], // breakpoints
	},
	compiler: {
			// Enables the styled-components SWC transform
			styledComponents: true,
			relay: {
					// This should match relay.config.js
					src: './',
					artifactDirectory: './__generated__',
					language: 'typescript',
			},
	},
	sassOptions: {
			includePaths: [path.join(__dirname, 'styles')],
	},

}

