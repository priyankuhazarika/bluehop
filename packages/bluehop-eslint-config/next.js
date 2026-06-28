import { react } from './react.js'

/**
 * React config tuned for Next.js. Next requires default exports for pages, route
 * handlers, layouts and config files, so `import/no-default-export` is relaxed there.
 */
export const next = [
  ...react,
  {
    files: [
      '**/app/**/*.{js,jsx,ts,tsx}',
      '**/pages/**/*.{js,jsx,ts,tsx}',
      '**/middleware.{js,ts}',
      '**/*.config.{js,cjs,mjs,ts}',
      '**/next-env.d.ts',
    ],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
]
