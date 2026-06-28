# @sleepingasteroid/bluehop-eslint-config

> Ready-to-use ESLint rules for TypeScript, React, Next.js, Node, and React Native — install
> one package, import one line, done.

## What is this?

[ESLint](https://eslint.org) is the tool that scans your code for mistakes and keeps its style
consistent. Setting it up from scratch is tedious: you install a parser, a handful of plugins
(TypeScript, React, hooks, accessibility, import rules), then hand-pick dozens of individual
rules — and keep all of that in sync across every project.

This package does all of that for you. It bundles every plugin it needs as its own dependency
and gives you a few **ready-made configs** you just drop in. You install **one** package and
import **one** line — no plugin juggling, no rule-by-rule setup.

## Why use it?

- **One install instead of ten** — all the plugins ship inside this package.
- **Sensible, strict defaults** already wired up (see the rules below).
- **Pick your project type** — a variant for plain TypeScript, Node, React, Next.js, or React
  Native.
- **Stays consistent everywhere** — update the rules here once and every project gets them.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-eslint-config eslint
```

## Use

Create an `eslint.config.js` and spread the variant that matches your project:

```js
import { react } from '@sleepingasteroid/bluehop-eslint-config'

export default [...react]
```

Subpath imports work too: `import config from '@sleepingasteroid/bluehop-eslint-config/next'`.

## Variants — pick the one that fits your project

| Variant       | Import path     | Use it for                   |
| ------------- | --------------- | ---------------------------- |
| `base`        | `/base`         | Any TypeScript project       |
| `node`        | `/node`         | Node services, CLIs, scripts |
| `react`       | `/react`        | Browser React apps           |
| `next`        | `/next`         | Next.js apps                 |
| `reactNative` | `/react-native` | React Native / Expo apps     |

## What rules does it enforce?

The main "house rules" baked in:

- **No `any`** — `@typescript-eslint/no-explicit-any` is an error.
- **No unused variables** — except ones you intentionally prefix with `_`.
- **Correct React hooks** — `react-hooks/exhaustive-deps` is an error.
- **Named exports only** — `import-x/no-default-export` is an error (automatically relaxed
  where frameworks require default exports, e.g. Next.js pages and config files).
- **No stray `console` calls** — `no-console` is an error (see below).
- **Formatting is left to Prettier** — this config switches off style rules so it never fights
  with [`bluehop-prettier-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-prettier-config).

### Allowing `console` in your logger

`no-console` is an error everywhere on purpose — logging should live in one dedicated module.
In that module, turn the rule off locally:

```ts
/* eslint-disable no-console -- this is the logging utility */
export const logger = {
  error: (msg: string, err: unknown) => console.error(msg, err),
}
```

---

Part of the **[bluehop](https://github.com/priyankuhazarika/bluehop)** toolkit — a set of
shareable project configs. Pairs well with `bluehop-prettier-config`, `bluehop-tsconfig`, and
`bluehop-git-hooks`.
