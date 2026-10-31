#!/usr/bin/env bash
# Copies the subject-agnostic core of this site into a sister site.
#
#   scripts/sync-core.sh <target-repo> [--dry-run]
#
# mathmax is the single source of truth for the shared code. This script mirrors
# the synced paths below into <target-repo> (deleting files that no longer exist
# here), stamps every synced file that can hold a comment with a header saying it
# is synced, copies the shared package.json fields, and writes CORE_VERSION with
# the mathmax commit it came from. Sister repos never edit synced paths: change
# them here, commit, then sync again.
#
# Site-owned paths are never touched: src/lib/curriculum/*.json and the rest of
# src/lib/curriculum/ apart from index.js, src/lib/i18n/site.vi.js,
# src/lib/domain/, src/lib/lessons/, static/, README, RUNBOOK, LICENSE, VERSION,
# CHANGELOG, package.json name/version/description and package-lock.json.
# The synced routes import src/lib/curriculum/legacy-redirects.js, so a target
# without one gets an empty table it then owns.
#
# Run it from a clean mathmax checkout so CORE_VERSION names exactly what was
# copied, into a target whose index is clean (nothing staged), so the sync
# commit holds only the sync: a deletion or rename staged earlier would
# otherwise be swept into it. Afterwards, in the target: npm install, then the
# repo gates, then commit the sync on its own after a `git status` that shows
# only synced paths; each commit must build on its own.
set -euo pipefail

die() {
  echo "sync-core: $1" >&2
  exit "${2:-2}"
}

usage() {
  echo "usage: scripts/sync-core.sh <target-repo> [--dry-run]" >&2
  exit 2
}

target=""
dry_run=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) dry_run=1 ;;
    -*) usage ;;
    *)
      [[ -z "$target" ]] || usage
      target="$arg"
      ;;
  esac
done
[[ -n "$target" ]] || usage

src="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
[[ -d "$target" ]] || die "$target is not a directory"
target="$(cd "$target" && pwd)"

[[ ! -f "$src/CORE_VERSION" ]] || die "$src is itself a synced copy; run this from mathmax"
[[ "$target" != "$src" ]] || die "target is this repo"
[[ -f "$target/package.json" ]] || die "$target has no package.json"

# Folders mirrored whole; files inside them that are gone here are deleted there.
SYNC_DIRS=(
  .claude/skills/write-lesson
  .github/workflows
  scripts
  src/lib/actions
  src/lib/algebra-engine
  src/lib/components
  src/lib/core
  src/lib/fraction-engine
  src/lib/geom-engine
  src/lib/numtheory-engine
  src/lib/stats-engine
  src/lib/units-engine
  src/lib/utils
  src/params
  src/routes
)

# Single files: configs, the app shell and the subject-agnostic accessors.
SYNC_FILES=(
  .prettierignore
  .prettierrc
  eslint.config.js
  jsconfig.json
  postcss.config.js
  tailwind.config.js
  vite.config.js
  vitest.config.js
  src/app.css
  src/app.html
  src/lib/curriculum/index.js
  src/lib/i18n/index.js
)

# package.json fields every site shares; name, version and description stay.
PACKAGE_FIELDS='["type", "scripts", "dependencies", "devDependencies", "imports", "engines"]'

dirty="$(git -C "$src" status --porcelain -- "${SYNC_DIRS[@]}" "${SYNC_FILES[@]}" package.json)"
if [[ -n "$dirty" ]]; then
  echo "sync-core: commit these first, so CORE_VERSION matches what is copied:" >&2
  echo "$dirty" >&2
  exit 1
fi
sha="$(git -C "$src" rev-parse HEAD)"

if git -C "$target" rev-parse --git-dir >/dev/null 2>&1; then
  staged="$(git -C "$target" diff --cached --name-status)"
  if [[ -n "$staged" ]]; then
    echo "sync-core: $target has staged changes; commit or unstage them first:" >&2
    echo "$staged" >&2
    exit 1
  fi
fi

if ((dry_run)); then
  for dir in "${SYNC_DIRS[@]}"; do
    [[ -d "$src/$dir" ]] && echo "would mirror $dir/ ($(find "$src/$dir" -type f | wc -l) files)"
  done
  for file in "${SYNC_FILES[@]}"; do
    [[ -f "$src/$file" ]] && echo "would copy $file"
  done
  echo "sync-core: dry run, nothing written (CORE_VERSION would be $sha)"
  exit 0
fi

# Every synced file is stamped, so it always differs from its source: replacing
# whole folders is as cheap as a delta copy and drops files deleted here.
for dir in "${SYNC_DIRS[@]}"; do
  [[ -d "$src/$dir" ]] || continue
  rm -rf "${target:?}/$dir"
  mkdir -p "$(dirname "$target/$dir")"
  cp -R "$src/$dir" "$target/$dir"
done
for file in "${SYNC_FILES[@]}"; do
  [[ -f "$src/$file" ]] || continue
  mkdir -p "$(dirname "$target/$file")"
  cp "$src/$file" "$target/$file"
done

# Stamps one synced file with the header, after a shebang, doctype or front
# matter when it has one. Files with no comment syntax (JSON) are left as is.
NOTE="Synced from tiennm99dev/mathmax by scripts/sync-core.sh. Do not edit it here; change it in mathmax and sync again."
stamp() {
  local file="$1" line
  case "$file" in
    *.js | *.cjs | *.mjs) line="// $NOTE" ;;
    *.svelte | *.html | *.md) line="<!-- $NOTE -->" ;;
    *.css) line="/* $NOTE */" ;;
    *.yml | *.yaml | *.sh | .prettierignore | */.prettierignore) line="# $NOTE" ;;
    *) return 0 ;;
  esac
  local first
  first="$(head -n 1 "$file")"
  local after=0
  if [[ "$first" == '#!'* || "$first" == '<!doctype'* || "$first" == '<!DOCTYPE'* ]]; then
    after=1
  elif [[ "$first" == '---' && "$file" == *.md ]]; then
    after="$(awk 'NR > 1 && $0 == "---" { print NR; exit }' "$file")"
    [[ -n "$after" ]] || after=0
  fi
  local tmp
  tmp="$(mktemp)"
  {
    head -n "$after" "$file"
    echo "$line"
    tail -n +"$((after + 1))" "$file"
  } >"$tmp"
  cat "$tmp" >"$file"
  rm -f "$tmp"
}

for dir in "${SYNC_DIRS[@]}"; do
  [[ -d "$target/$dir" ]] || continue
  while IFS= read -r -d '' file; do stamp "$file"; done < <(find "$target/$dir" -type f -print0)
done
for file in "${SYNC_FILES[@]}"; do
  [[ -f "$target/$file" ]] && stamp "$target/$file"
done

node --input-type=module - "$src/package.json" "$target/package.json" "$PACKAGE_FIELDS" <<'EOF'
import { readFileSync, writeFileSync } from 'node:fs';
const [from, to, fields] = process.argv.slice(2);
const source = JSON.parse(readFileSync(from, 'utf8'));
const pkg = JSON.parse(readFileSync(to, 'utf8'));
for (const field of JSON.parse(fields)) {
  if (field in source) pkg[field] = source[field];
  else delete pkg[field];
}
writeFileSync(to, `${JSON.stringify(pkg, null, 2)}\n`);
EOF

redirects="$target/src/lib/curriculum/legacy-redirects.js"
if [[ ! -f "$redirects" ]]; then
  mkdir -p "$(dirname "$redirects")"
  cat >"$redirects" <<'EOF'
/**
 * Old URLs of this site, each prerendered as a meta-refresh page pointing at its
 * new curriculum path. Site-owned: sync-core.sh only creates this file.
 */

/** @typedef {{ strand: string, slug: string, to: string }} LegacyRedirect */

/** @type {LegacyRedirect[]} */
export const legacyRedirects = [];

/**
 * @param {string} strand
 * @param {string} slug
 * @returns {LegacyRedirect | undefined}
 */
export function findRedirect(strand, slug) {
  return legacyRedirects.find((r) => r.strand === strand && r.slug === slug);
}
EOF
  echo "sync-core: created an empty $redirects"
fi

echo "$sha" >"$target/CORE_VERSION"
echo "sync-core: synced mathmax $sha into $target"
echo "sync-core: next, in $target: npm install, then lint, format:check, check, test and build"
echo "sync-core: then check git status and commit the sync on its own"
