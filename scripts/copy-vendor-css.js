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
  
  // JS
  { src: 'node_modules/reveal.js/dist/reveal.js', dest: 'dist/vendor/reveal.js' },
  { src: 'node_modules/reveal.js/plugin/markdown/markdown.js', dest: 'dist/vendor/markdown.js' },
  { src: 'node_modules/reveal.js/plugin/math/math.js', dest: 'dist/vendor/math.js' },
  { src: 'node_modules/highlight.js/lib/index.js', dest: 'dist/vendor/highlight.js' },
  { src: 'node_modules/highlight.js/lib/core.js', dest: 'dist/vendor/highlight-core.js' },
  { src: 'node_modules/highlight.js/lib/highlight.js', dest: 'dist/vendor/highlight.min.js' }
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
