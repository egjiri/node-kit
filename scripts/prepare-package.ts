import { removeKeys } from '../src/objects';
import { writeFileSync, readFileSync } from 'fs';

const packageJSON = JSON.parse(readFileSync('package.json', 'utf8'));
const newPackageJSON = removeKeys(packageJSON, 'scripts', 'devDependencies');
writeFileSync('build/package.json', JSON.stringify(newPackageJSON, null, 2));
