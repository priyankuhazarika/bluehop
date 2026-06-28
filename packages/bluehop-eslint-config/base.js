import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import-x'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

/**
 * Base flat config: TypeScript + import hygiene + the house rules.
 *
 * Formatting is owned by Prettier, so `eslint-config-prettier` is applied last to
 * switch off any stylistic rules that would conflict.
 */
export const base = tseslint.config(
  {
    ignores: ['**/dist/**', '**/build/**', '**/coverage/**', '**/node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { 'import-x': importPlugin },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.es2021 },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // Named exports only — see README for the documented Next.js exception.
      'import-x/no-default-export': 'error',
      // Logging belongs in dedicated logging utilities; override there with eslint-disable.
      'no-console': 'error',
      eqeqeq: ['error', 'smart'],
      'no-implicit-coercion': 'error',
    },
  },
  prettier,
)
