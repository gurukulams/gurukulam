import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default ['sql_exams', 'presentations'].map((name, index) => ({
	input: `./src/js/${name}/app.js`,
	output: {
		file: `./dist/js/${name}.min.js`,
		format: 'iife',
		name: 'bundle',
		globals: {
			lodash: '_',
		},
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
		resolve(),
		commonjs(),
	],
}));
