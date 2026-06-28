# @sleepingasteroid/bluehop-eslint-config

Shared **ESLint flat configs**. All plugins ship as dependencies of this package, so you
install one package and import a ready-made config — no plugin juggling in your project.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-eslint-config eslint
```

## Use

Create `eslint.config.js` and spread the variant you need:

```js
import { react } from '@sleepingasteroid/bluehop-eslint-config'

export default [...react]
```

Subpath imports work too: `@sleepingasteroid/bluehop-eslint-config/next`.

## Variants

| Variant       | Import path     | For                          |
| ------------- | --------------- | ---------------------------- |
| `base`        | `/base`         | Any TypeScript project       |
| `node`        | `/node`         | Node services, CLIs, scripts |
| `react`       | `/react`        | Browser React apps           |
| `next`        | `/next`         | Next.js apps                 |
| `reactNative` | `/react-native` | React Native / Expo apps     |

## House rules encoded here

- `@typescript-eslint/no-explicit-any` → error (no `any`)
- `@typescript-eslint/no-unused-vars` → error (`_`-prefixed args/vars are ignored)
- `react-hooks/exhaustive-deps` → error
- `import-x/no-default-export` → error (named exports only; relaxed for Next.js pages/config)
- `no-console` → error
- Formatting is delegated to Prettier (`eslint-config-prettier` applied last)

### `no-console` in logging utilities

`no-console` is an error everywhere. In your dedicated logger module, disable it locally:

```ts
/* eslint-disable no-console -- this is the logging utility */
export const logger = {
  error: (msg: string, err: unknown) => console.error(msg, err),
}
```
