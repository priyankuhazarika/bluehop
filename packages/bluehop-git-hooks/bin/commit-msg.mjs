#!/usr/bin/env node
// Validates the commit message against Conventional Commits using commitlint's Node API.
// Everything is resolved from THIS package's own dependency tree and anchored there, so it
// works regardless of the consumer project's (pnpm) node_modules layout.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname } from 'node:path'

import load from '@commitlint/load'
import lint from '@commitlint/lint'

const require = createRequire(import.meta.url)

const messageFile = process.argv[2]
if (!messageFile) {
  console.error('[phz-hooks] commit-msg: no message file passed by git')
  process.exit(1)
}

try {
  const message = readFileSync(messageFile, 'utf8')

  // Absolute path to the conventional config inside this package's deps. Anchoring
  // commitlint's cwd here means it never tries (and fails) to resolve config or the
  // parser preset from the consumer's project root.
  const conventionalPath = require.resolve('@commitlint/config-conventional')
  const { rules, parserPreset } = await load(
    { extends: [conventionalPath] },
    { cwd: dirname(conventionalPath) },
  )

  const report = await lint(
    message,
    rules,
    parserPreset ? { parserOpts: parserPreset.parserOpts } : {},
  )

  if (!report.valid) {
    console.error('[phz-hooks] commit message rejected:')
    for (const problem of [...report.errors, ...report.warnings]) {
      const mark = problem.level === 2 ? '✖' : '⚠'
      console.error(`  ${mark} ${problem.message}`)
    }
    console.error('\nUse Conventional Commits, e.g. "feat(auth): add password reset".')
    process.exit(1)
  }
} catch (error) {
  console.error('[phz-hooks] commit-msg check failed:', error)
  process.exit(1)
}
