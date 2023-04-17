module.exports = {
    extends: ["next"],
    rules: {
        indent: [
            "off",
            4,
            {
                SwitchCase: 1,
                FunctionDeclaration: {
                    parameters: "first",
                },
            },
        ],
        "comma-dangle": ["error", "only-multiline"],
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-undef": "off",
        "max-len": [
            0,
            {
                code: 120,
                comments: 200,
                ignorePattern: true,
                ignoreComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
            },
        ],
    },
}
