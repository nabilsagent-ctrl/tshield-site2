// Bundles src/index.ts → dist/index.js (ESM, react external) and src/styles/index.css → dist/styles.css.
import { build } from 'esbuild';
import { mkdirSync, copyFileSync, readdirSync } from 'fs';
mkdirSync('dist', { recursive: true });
await build({ entryPoints: ['src/index.ts'], bundle: true, format: 'esm', platform: 'browser', target: 'es2020', outfile: 'dist/index.js', external: ['react', 'react-dom', 'react/jsx-runtime'], jsx: 'automatic', sourcemap: false, logLevel: 'warning' });
await build({ entryPoints: ['src/styles/index.css'], bundle: true, outfile: 'dist/styles.css', loader: { '.woff2': 'file' }, assetNames: 'fonts/[name]', logLevel: 'warning' });
console.log('built dist/index.js + dist/styles.css');
