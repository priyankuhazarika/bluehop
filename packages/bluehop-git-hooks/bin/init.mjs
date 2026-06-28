#!/usr/bin/env node
// Sets up husky + lint-staged + commitlint in the consumer project. Idempotent:
// safe to re-run (e.g. from a `prepare` script after every install).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import husky from 'husky'

const here = dirname(fileURLToPath(import.meta.url))
const templates = join(here, '..', 'templates')
const cwd = process.cwd()

if (!existsSync(join(cwd, '.git'))) {
  console.warn('[phz-hooks] no .git directory found — run `git init` first. Skipping.')
  process.exit(0)
}

// 1. Initialize husky (creates .husky/_ and points core.hooksPath at it).
const result = husky()
if (result) console.log(`[phz-hooks] ${result}`)

// 2. Write the hook entrypoints (they call this package's wrapper bins).
const huskyDir = join(cwd, '.husky')
mkdirSync(huskyDir, { recursive: true })
writeHook('pre-commit', 'phz-hooks-pre-commit\n')
writeHook('commit-msg', 'phz-hooks-commit-msg "$1"\n')

// 3. Scaffold the lint-staged config (re-exports ours) if absent. commit-msg is
//    self-contained (always Conventional Commits), so it needs no consumer config.
copyIfAbsent('lint-staged.config.mjs')

// 4. Ensure a `prepare` script so hooks reinstall after a fresh clone/install.
ensurePrepareScript()

console.log('[phz-hooks] git hooks installed (pre-commit → lint-staged, commit-msg → commitlint).')

function writeHook(name, body) {
  const path = join(huskyDir, name)
  writeFileSync(path, body)
  console.log(`✓ .husky/${name}`)
}

function copyIfAbsent(file) {
  const target = join(cwd, file)
  if (existsSync(target)) {
    console.log(`• skip ${file} (exists)`)
    return
  }
  writeFileSync(target, readFileSync(join(templates, file)))
  console.log(`✓ ${file}`)
}

function ensurePrepareScript() {
  const pkgPath = join(cwd, 'package.json')
  if (!existsSync(pkgPath)) return
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  pkg.scripts ??= {}
  if (pkg.scripts.prepare?.includes('phz-hooks-init')) return
  pkg.scripts.prepare = pkg.scripts.prepare
    ? `${pkg.scripts.prepare} && phz-hooks-init`
    : 'phz-hooks-init'
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  console.log('✓ added "prepare": "phz-hooks-init" to package.json')
}
