import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

import { base } from './base.js'

/**
 * React config for React Native / Expo. No DOM globals; metro/babel resolve modules,
 * and config files (metro.config, babel.config, app.config) need default exports.
 */
export const reactNative = [
  ...base,
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat.recommended,
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: ['**/*.config.{js,cjs,mjs,ts}', '**/app.config.{js,ts}'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
]
