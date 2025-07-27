import { removeKeys } from '../src/objects';
import { writeFileSync, readFileSync, copyFileSync } from 'fs';

const packageJSON = JSON.parse(readFileSync('package.json', 'utf8'));
const newPackageJSON = removeKeys(packageJSON, 'scripts', 'devDependencies', 'engines', 'volta', 'private', 'files');
console.log('📝 Updated package.json\n', newPackageJSON);

writeFileSync('./dist/package.json', JSON.stringify(newPackageJSON, null, 2));
copyFileSync('README.md', './dist/README.md');
copyFileSync('logo.svg', './dist/logo.svg');
console.log('✅ Saved Updated "package.json", "README.md", and "logo.svg" in "./dist" directory.');

console.log('🎉 Done!');
