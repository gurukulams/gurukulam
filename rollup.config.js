import eslint from '@rollup/plugin-eslint';
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from 'rollup-plugin-node-resolve'

export default [{
  input: 'src/js/core/index.js',
  plugins: [
    eslint({
      fix:true,
      throwOnError:true
    })
  ],
  output: {
    file: 'dist/js/app.js',
    format: 'cjs'
  }
}, {
  input: 'src/js/welcome/index.js',
  plugins: [
    eslint({
      /* your options */
      
    }),
  ],
  output: {
    file: 'dist/js/welcome.js',
    format: 'cjs'
  }
},
{
  input: 'src/js/login/index.js',
  plugins: [
    eslint({
      /* your options */
    })
  ],
  output: {
    file: 'dist/js/login.js',
    format: 'cjs'
  }
}
];

