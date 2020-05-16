import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
	input: "./src/js/app.js",
	output: {
		file: "./dist/js/bundle.min.js",
		format: "iife",
		name: "bundle",
		globals: {
			lodash: "_",
		},
	},
	plugins: [
		babel({
			exclude: "node_modules/**",
		}),
		resolve(),
		commonjs(),
	],
};
