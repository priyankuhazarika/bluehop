#!/usr/bin/env node
import { copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const source = join(here, '..', 'template', 'CLAUDE.md')
const target = join(process.cwd(), 'CLAUDE.md')
const force = process.argv.includes('--force')

if (existsSync(target) && !force) {
  console.error('CLAUDE.md already exists — pass --force to overwrite.')
  process.exit(1)
}

copyFileSync(source, target)
console.log('✓ wrote CLAUDE.md — fill in the <…> placeholders for this project.')
