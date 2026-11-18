import fs from 'fs';
import path from 'path';

const nativeJsPath = path.resolve('node_modules', 'rollup', 'dist', 'native.js');

if (fs.existsSync(nativeJsPath)) {
  let content = fs.readFileSync(nativeJsPath, 'utf8');
  if (!content.includes('@rollup/wasm-node')) {
    content = content.replace(
      'const nativeModule = requireWithFriendlyError(',
      `let nativeModule;
try {
  nativeModule = requireWithFriendlyError(`
    );
    content = content.replace(
      'const { parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = nativeModule;',
      `} catch (err) {
  try {
    nativeModule = require('@rollup/wasm-node/dist/native.js');
  } catch (wasmErr) {
    throw err;
  }
}

const { parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = nativeModule;`
    );
    fs.writeFileSync(nativeJsPath, content, 'utf8');
    console.log('[patch-rollup] Successfully patched Rollup native loader with WASM fallback.');
  }
}
