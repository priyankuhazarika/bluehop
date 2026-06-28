# @sleepingasteroid/bluehop-prettier-config

Shared Prettier config — single quotes, no semicolons, 2-space indent, 100 print width.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-prettier-config prettier
```

## Use

Reference it from your `package.json`:

```jsonc
{
  "prettier": "@sleepingasteroid/bluehop-prettier-config",
}
```

To extend or override, use a `prettier.config.js` instead:

```js
import base from '@sleepingasteroid/bluehop-prettier-config'

/** @type {import('prettier').Config} */
export default {
  ...base,
  // project-specific overrides here
}
```
