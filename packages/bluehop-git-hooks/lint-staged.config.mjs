/**
 * Default lint-staged tasks. ESLint and Prettier are resolved from the consumer
 * project (they install both alongside the shared configs).
 */
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx,css,scss,yml,yaml}': ['prettier --write'],
}
