#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const templates = join(here, '..', 'templates')
const cwd = process.cwd()
const force = process.argv.includes('--force')

/** template file -> destination relative to the consumer project root */
const FILES = [
  ['editorconfig', '.editorconfig'],
  ['vscode-settings.json', join('.vscode', 'settings.json')],
  ['vscode-extensions.json', join('.vscode', 'extensions.json')],
]

let written = 0
let skipped = 0

for (const [template, dest] of FILES) {
  const target = join(cwd, dest)
  if (existsSync(target) && !force) {
    console.log(`• skip   ${dest} (exists — pass --force to overwrite)`)
    skipped += 1
    continue
  }
  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(join(templates, template), target)
  console.log(`✓ write  ${dest}`)
  written += 1
}

console.log(`\nEditor config applied: ${written} written, ${skipped} skipped.`)
