import { node } from '@sleepingasteroid/bluehop-eslint-config'

// This repo dogfoods its own configs. The overrides below cover files that are
// intentionally not "named-export TS modules": config entrypoints, CommonJS files,
// CLI bins, and copy-me-into-a-consumer templates.
export default [
  { ignores: ['**/templates/**'] },
  ...node,
  {
    files: [
      '**/*.config.{js,cjs,mjs}',
      'eslint.config.js',
      'packages/bluehop-prettier-config/index.js',
    ],
    rules: { 'import-x/no-default-export': 'off' },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { module: 'readonly', require: 'readonly' },
    },
    rules: { 'import-x/no-default-export': 'off' },
  },
  {
    files: ['packages/*/bin/**'],
    rules: { 'no-console': 'off' },
  },
]
