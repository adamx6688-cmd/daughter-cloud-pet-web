import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const forbiddenAppIds = new Set(['wxa0cee7d98ea494cd']);
const secretPattern = /(PRIVATE KEY|privateKey\s*[:=]|secretKey\s*[:=]|api[_-]?key\s*[:=]|apiKey\s*[:=]|AppSecret\s*[:=])/i;

function readJson(relativePath) {
  const fullPath = path.join(root, relativePath);
  assert.ok(fs.existsSync(fullPath), `${relativePath} is missing`);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(root, fullPath);
    if (entry.isDirectory()) {
      if (['.git', 'node_modules', 'dist', 'coverage', 'test-results', '.preview'].includes(entry.name)) {
        return [];
      }
      return listFiles(fullPath);
    }
    if (relativePath === 'tests/preflight.js' || relativePath.endsWith('.png') || relativePath.endsWith('.jpg')) {
      return [];
    }
    return [relativePath];
  });
}

function check(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

check('package uses web app scripts as the main delivery path', () => {
  const pkg = readJson('package.json');
  assert.equal(pkg.name, 'daughter-cloud-pet-web');
  assert.equal(pkg.scripts.dev.includes('vite'), true);
  assert.equal(pkg.scripts.build.includes('vite build'), true);
  assert.equal(pkg.scripts.qa.includes('test:e2e'), true);
});

check('netlify deploy configuration publishes the built web artifact', () => {
  const netlify = fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8');
  assert.match(netlify, /command = "npm run build"/);
  assert.match(netlify, /publish = "dist"/);
});

check('active source does not use a forbidden old AppID', () => {
  const sourceText = listFiles(path.join(root, 'src'))
    .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
    .join('\n');
  forbiddenAppIds.forEach((appid) => assert.equal(sourceText.includes(appid), false, `forbidden AppID ${appid} found`));
});

check('no obvious committed secret assignments', () => {
  const offenders = listFiles(root).filter((file) => {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    return secretPattern.test(text);
  });
  assert.deepEqual(offenders, []);
});
