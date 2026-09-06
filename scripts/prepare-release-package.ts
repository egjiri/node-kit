import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { removeKeys } from '../src/objects/index.js';

const packageJSON = JSON.parse(readFileSync('package.json', 'utf8'));
const newPackageJSON = {
  ...removeKeys(packageJSON, 'scripts', 'devDependencies', 'engines', 'volta', 'packageManager', 'private', 'files'),
  engines: { node: packageJSON.engines.node },
};
console.log('📝 Updated package.json\n', newPackageJSON);

writeFileSync('./dist/package.json', JSON.stringify(newPackageJSON, null, 2));
writeFileSync('./dist/cjs/package.json', JSON.stringify({ type: 'commonjs' }, null, 2));
copyFileSync('README.md', './dist/README.md');
copyFileSync('logo.svg', './dist/logo.svg');
console.log('✅ Saved Updated "package.json", "cjs/package.json", "README.md", and "logo.svg" in "./dist" directory.');

console.log('🎉 Done!');
