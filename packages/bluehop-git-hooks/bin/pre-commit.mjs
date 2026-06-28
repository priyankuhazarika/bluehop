#!/usr/bin/env node
// Runs lint-staged via its Node API so the binary resolves reliably under pnpm,
// even though lint-staged is a dependency of @sleepingasteroid/bluehop-git-hooks rather
// than of the consumer project.
import lintStaged from 'lint-staged'

try {
  const success = await lintStaged()
  process.exit(success ? 0 : 1)
} catch (error) {
  console.error('[bluehop-hooks] pre-commit failed:', error)
  process.exit(1)
}
