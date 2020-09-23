module.exports = {
	"ignore": [/(node_modules)/],
  "presets": [
    [
      "@babel/preset-env",
      {
				"useBuiltIns": "usage",
				"corejs": 3,
				"modules": "commonjs"
      }
    ],
    "@babel/preset-react"
  ]
}