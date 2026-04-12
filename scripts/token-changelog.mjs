/**
 * token-changelog.mjs
 *
 * Run before every token build. Diffs tokens.json against the last
 * snapshot, appends an entry to src/tokens/changelog.json, then
 * updates the snapshot so the next run sees a clean baseline.
 *
 * Usage: node scripts/token-changelog.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT          = join(fileURLToPath(import.meta.url), '../../');
const TOKENS_PATH   = join(ROOT, 'tokens.json');
const SNAPSHOT_PATH = join(ROOT, 'tokens.snapshot.json');
const CHANGELOG_DIR = join(ROOT, 'src/tokens');
const CHANGELOG_PATH = join(CHANGELOG_DIR, 'changelog.json');

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Recursively flatten a nested token tree to a path→{value,type} map. */
function flatten(obj, prefix = '') {
  const out = {};
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && '$value' in val) {
      out[path] = { value: val.$value, type: val.$type ?? 'unknown' };
    } else if (val && typeof val === 'object') {
      Object.assign(out, flatten(val, path));
    }
  }
  return out;
}

/** Produce a sorted list of added / modified / removed changes. */
function diff(prev, next) {
  const changes = [];
  const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);

  for (const key of keys) {
    const a = prev[key];
    const b = next[key];

    if (!a && b) {
      changes.push({ path: key, type: b.type, change: 'added',    before: null,    after: b.value });
    } else if (a && !b) {
      changes.push({ path: key, type: a.type, change: 'removed',  before: a.value, after: null });
    } else if (a.value !== b.value) {
      changes.push({ path: key, type: b.type, change: 'modified', before: a.value, after: b.value });
    }
  }

  return changes.sort((a, b) => a.path.localeCompare(b.path));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const current = JSON.parse(readFileSync(TOKENS_PATH, 'utf8'));
const flatCurrent = flatten(current);

const flatPrev = existsSync(SNAPSHOT_PATH)
  ? flatten(JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8')))
  : {};

const changes = diff(flatPrev, flatCurrent);

// Load or initialise changelog
mkdirSync(CHANGELOG_DIR, { recursive: true });
const changelog = existsSync(CHANGELOG_PATH)
  ? JSON.parse(readFileSync(CHANGELOG_PATH, 'utf8'))
  : [];

if (changes.length > 0) {
  const entry = {
    timestamp: new Date().toISOString(),
    changeCount: changes.length,
    summary: {
      added:    changes.filter(c => c.change === 'added').length,
      modified: changes.filter(c => c.change === 'modified').length,
      removed:  changes.filter(c => c.change === 'removed').length,
    },
    changes,
  };
  changelog.unshift(entry);
  writeFileSync(CHANGELOG_PATH, JSON.stringify(changelog, null, 2));
  console.log(`token-changelog: ${changes.length} change(s) recorded`
    + ` (+${entry.summary.added} ~${entry.summary.modified} -${entry.summary.removed})`);
} else {
  console.log('token-changelog: no changes since last snapshot');
}

// Always refresh snapshot
writeFileSync(SNAPSHOT_PATH, JSON.stringify(current, null, 2));
console.log('token-changelog: snapshot updated');
