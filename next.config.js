const path = require('path')

module.exports = {
	env: {
		API_SERVER: process.env.SERVER + '/api',
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
		domains: ['localhost', process.env.SERVER_HOST],
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

