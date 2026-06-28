# @sleepingasteroid/bluehop-prettier-config

> A shared Prettier style so all your projects are formatted the exact same way — set it once,
> never argue about formatting again.

## What is this?

[Prettier](https://prettier.io) is a code formatter — it automatically rewrites your code into
a consistent style (spacing, quotes, line breaks) every time you save. It has lots of small
options, and if every project sets them slightly differently, your code looks different
everywhere.

This package is one ready-made set of those options, packaged so you can share it. Point your
project at it and you get the exact same formatting as every other project that uses it.

**The style:** single quotes, no semicolons, 2-space indentation, 100-character line width,
trailing commas.

## Why use it?

- **Decide formatting once**, reuse it in every project.
- **No bikeshedding** — the rules are fixed, so there's nothing to debate in code review.
- **Update in one place** — change the style here and every project picks it up on the next
  version bump.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-prettier-config prettier
```

## Use

The simplest way — point to it from your `package.json`:

```jsonc
{
  "prettier": "@sleepingasteroid/bluehop-prettier-config",
}
```

That's it. Run `prettier --write .` (or let your editor format on save) and your code follows
the shared style.

### Overriding a setting

If a project needs to tweak something, use a `prettier.config.js` that spreads the shared
config and changes only what you need:

```js
import base from '@sleepingasteroid/bluehop-prettier-config'

/** @type {import('prettier').Config} */
export default {
  ...base,
  // project-specific overrides here, e.g.
  // printWidth: 120,
}
```

---

Part of the **[bluehop](https://github.com/priyankuhazarika/bluehop)** toolkit — a set of
shareable project configs. Works hand-in-hand with
[`bluehop-eslint-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-eslint-config),
which leaves all formatting to Prettier so the two never conflict.
