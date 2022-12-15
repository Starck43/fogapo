module.exports = {
	"presets": [
		"next/babel",
	],
	"plugins": [
		[
			"babel-plugin-styled-components",
		],
		[
			"babel-plugin-root-import",
			{
				"ssr": false,
				"displayName": true,
				"preprocess": false
			}

		],
		[
			"macros"
		],
	]
}
