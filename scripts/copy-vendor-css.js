  
const fs = require('fs');
const path = require('path');

const vendorDir = path.resolve(__dirname, '../', 'dist/vendor');
if (!fs.existsSync(vendorDir)) {
  fs.mkdirSync(vendorDir, { recursive: true });
}

const filesToCopy = [
    // CSS
    { src: 'node_modules/reveal.js/dist/reveal.css', dest: 'dist/vendor/reveal.css' },
    { src: 'node_modules/reveal.js/dist/theme/simple.css', dest: 'dist/vendor/simple.css' },
    { src: 'node_modules/reveal.js/dist/theme/white.css', dest: 'dist/vendor/white.css' },
    { src: 'node_modules/highlight.js/styles/default.css', dest: 'dist/vendor/highlight-default.css' },
    { src: 'node_modules/quill/dist/quill.snow.css', dest: 'dist/vendor/quill.snow.css' },
    { src: 'node_modules/katex/dist/katex.min.css', dest: 'dist/vendor/katex.min.css' },
    { src: 'node_modules/jsxgraph/distrib/jsxgraph.css', dest: 'dist/vendor/jsxgraph.css' },

    // JS
    { src: 'node_modules/reveal.js/dist/reveal.js', dest: 'dist/vendor/reveal.js' },
    { src: 'node_modules/reveal.js/plugin/markdown/markdown.js', dest: 'dist/vendor/markdown.js' },
    { src: 'node_modules/reveal.js/plugin/math/math.js', dest: 'dist/vendor/math.js' },
    { src: 'node_modules/highlight.js/lib/index.js', dest: 'dist/vendor/highlight.js' },
    { src: 'node_modules/highlight.js/lib/core.js', dest: 'dist/vendor/highlight-core.js' },
    { src: 'node_modules/highlight.js/lib/highlight.js', dest: 'dist/vendor/highlight.min.js' },
    { src: 'node_modules/highlight.js/lib/index.js', dest: 'dist/vendor/highlight.min.js' },
    { src: 'node_modules/reveal.js/plugin/markdown/markdown.js', dest: 'dist/vendor/markdown.min.js' },
  // Recogito & Annotorious CSS
    { src: 'node_modules/@recogito/recogito-js/dist/recogito.min.css', dest: 'dist/vendor/recogito.min.css' },
    { src: 'node_modules/@recogito/annotorious/dist/annotorious.min.css', dest: 'dist/vendor/annotorious.min.css' },
    // Quill CSS
    { src: 'node_modules/quill/dist/quill.snow.css', dest: 'dist/vendor/quill.snow.css' },
    // KaTeX CSS
    { src: 'node_modules/katex/dist/katex.min.css', dest: 'dist/vendor/katex.min.css' },
    // JSXGraph CSS
    { src: 'node_modules/jsxgraph/distrib/jsxgraph.css', dest: 'dist/vendor/jsxgraph.css' },
    // EasyMDE CSS
    { src: 'node_modules/easymde/dist/easymde.min.css', dest: 'dist/vendor/easymde.min.css' },
    // KaTeX auto-render JS
    { src: 'node_modules/katex/dist/contrib/auto-render.js', dest: 'dist/vendor/auto-render.js' },
    // JSXGraph core JS
    { src: 'node_modules/jsxgraph/distrib/jsxgraphcore.js', dest: 'dist/vendor/jsxgraphcore.js' },
    // Bootstrap color-modes JS (custom src path)
    { src: 'src/js/color-modes.js', dest: 'dist/vendor/color-modes.js' },
    { src: 'node_modules/@popperjs/core/dist/umd/popper.min.js', dest: 'dist/vendor/popper.min.js' },
];
  
filesToCopy.forEach(({src, dest}) => {
  const srcPath = path.resolve(__dirname, '../', src);
  const destPath = path.resolve(__dirname, '../', dest);
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${src} to ${dest}`);
    } else {
      console.warn(`Warning: Source file not found: ${src}`);
    }
  } catch (err) {
    console.error(`Error copying ${src} to ${dest}:`, err.message);
  }
});
