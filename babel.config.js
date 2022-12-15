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
				"ssr": true,
				"displayName": true,
				"preprocess": false
			}

		],
		[
			"macros"
		],
	]
}
