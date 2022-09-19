import eslint from '@rollup/plugin-eslint';

export default [{
  input: 'src/js/core/index.js',
  plugins: [
    eslint({
      fix:true,
      throwOnError:true
    })
  ],
  output: {
    file: 'dist/js/core.js',
    format: 'cjs'
  }
}, {
  input: 'src/js/oauth/index.js',
  plugins: [
    eslint({
      /* your options */
    })
  ],
  output: {
    file: 'dist/js/oauth.js',
    format: 'cjs'
  }
},
{
  input: 'src/js/main/index.js',
  plugins: [
    eslint({
      /* your options */
    })
  ],
  output: {
    file: 'dist/js/index.js',
    format: 'cjs'
  }
},
{
  input: 'src/js/practice/index.js',
  plugins: [
    eslint({
      /* your options */
    })
  ],
  output: {
    file: 'dist/js/practices.js',
    format: 'cjs'
  }
},
{
  input: 'src/js/books/index.js',
  plugins: [
    eslint({
      /* your options */
    })
  ],
  output: {
    file: 'dist/js/chapter.js',
    format: 'cjs'
  }
},
{
  input: 'src/js/chat/index.js',
  plugins: [
    eslint({
      /* your options */
    })
  ],
  output: {
    file: 'dist/js/chat.js',
    format: 'cjs'
  }
},
{
  input: 'src/js/search/index.js',
  plugins: [
    eslint({
      /* your options */
    })
  ],
  output: {
    file: 'dist/js/search.js',
    format: 'cjs'
  }
}
];

