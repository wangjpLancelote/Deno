module.exports = {
	presets: ["@babel/env"],
	plugins: [
		[
			"@babel/plugin-proposal-decorators",
			{
				legacy: true
			}
		],
		["transform-decorators-legacy"],
		["@babel/plugin-proposal-object-rest-spread", {}],
		["@babel/plugin-syntax-dynamic-import", {}],
		["@babel/plugin-transform-modules-commonjs", {}],
		["@babel/plugin-transform-runtime", {}],
		["@babel/plugin-proposal-export-default-from", {}],
		["@babel/plugin-proposal-class-properties", {}],
		["add-module-exports", {}]
	],
	compact: false
};
