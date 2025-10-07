#!/usr/bin/env node
// Verifies that the packed tarball prints the same version as package.json
// by installing the packed tgz into a temp project and running `openspec --version`.

import { execFileSync } from 'child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

function log(msg) {
  if (process.env.CI) return; // keep CI logs quiet by default
  console.log(msg);
}

function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'], ...opts });
}

function npmPack() {
  try {
    const jsonOut = run('npm', ['pack', '--json', '--silent']);
    const arr = JSON.parse(jsonOut);
    const file = Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1].filename || arr[arr.length - 1] : null;
    if (!file) throw new Error('npm pack returned unexpected JSON');
    return file.trim();
  } catch (e) {
    // Fallback for older npm: last line of output is filename
    const out = run('npm', ['pack', '--silent']).trim();
    const lines = out.split(/\r?\n/);
    return lines[lines.length - 1].trim();
  }
}

function main() {
  const pkg = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
  const expected = pkg.version;

  let work;
  let tgzPath;

  try {
    log(`Packing @fission-ai/openspec@${expected}...`);
    const filename = npmPack();
    tgzPath = path.resolve(filename);
    log(`Created: ${tgzPath}`);

    work = mkdtempSync(path.join(tmpdir(), 'openspec-pack-check-'));
    log(`Temp dir: ${work}`);

    // Make a tiny project
    writeFileSync(
      path.join(work, 'package.json'),
      JSON.stringify({ name: 'pack-check', private: true }, null, 2)
    );

    // Try to avoid noisy output and speed up
    const env = {
      ...process.env,
      npm_config_loglevel: 'silent',
      npm_config_audit: 'false',
      npm_config_fund: 'false',
      npm_config_progress: 'false',
    };

    // Install the tarball
    run('npm', ['install', tgzPath, '--silent', '--no-audit', '--no-fund'], { cwd: work, env });

    // Run the installed CLI via Node to avoid bin resolution/platform issues
    const binRel = path.join('node_modules', '@fission-ai', 'openspec', 'bin', 'openspec.js');
    const actual = run(process.execPath, [binRel, '--version'], { cwd: work }).trim();

    if (actual !== expected) {
      throw new Error(
        `Packed CLI version mismatch: expected ${expected}, got ${actual}. ` +
          'Ensure the dist is built and the CLI reads version from package.json.'
      );
    }

    log('Version check passed.');
  } finally {
    // Always attempt cleanup
    if (work) {
      try { rmSync(work, { recursive: true, force: true }); } catch {}
    }
    if (tgzPath) {
      try { rmSync(tgzPath, { force: true }); } catch {}
    }
  }
}

try {
  main();
  console.log('✅ pack-version-check: OK');
} catch (err) {
  console.error(`❌ pack-version-check: ${err.message}`);
  process.exit(1);
}
