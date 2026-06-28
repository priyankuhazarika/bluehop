# @sleepingasteroid/bluehop-tsconfig

> Strict TypeScript settings, ready to use — extend one preset and your project is configured
> with safe, modern defaults.

## What is this?

A `tsconfig.json` is the file that tells TypeScript how to check and compile your code. There
are a _lot_ of options, and getting the strict, safe ones right (and remembering them for every
new project) is a pain.

This package is a set of **ready-made `tsconfig` presets**. You point your project's
`tsconfig.json` at the one that matches your project (Node, React, Next.js, etc.) using
`extends`, and you instantly inherit a carefully chosen, strict configuration.

## Why use it?

- **Strict by default** — catches whole classes of bugs at compile time (see below).
- **One line of setup** — `extends` a preset instead of copying 30 options.
- **The right preset per project** — Node services, React libraries, Next.js apps, and React
  Native all have their own.
- **Consistent across projects** — update the presets here once and everyone inherits it.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-tsconfig typescript
```

## Use

In your project's `tsconfig.json`, extend the preset you need:

```jsonc
// tsconfig.json
{
  "extends": "@sleepingasteroid/bluehop-tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }, // your absolute-import aliases
  },
  "include": ["src"],
}
```

## Presets — pick the one that fits your project

| Preset               | Use it for                                |
| -------------------- | ----------------------------------------- |
| `base.json`          | The strict foundation the others build on |
| `node.json`          | Node services / CLIs (emits to `dist`)    |
| `react-library.json` | Bundled React component libraries         |
| `nextjs.json`        | Next.js apps                              |
| `react-native.json`  | React Native / Expo apps                  |

## What makes it "strict"?

Every preset turns on `strict` mode plus extra safety checks like
`noUncheckedIndexedAccess` (array/object access might be `undefined`),
`exactOptionalPropertyTypes`, and `noImplicitOverride`. These catch real mistakes that the
default settings let slip through.

> Tip: set `baseUrl` and `paths` in your own `tsconfig.json` (as shown above) to enable
> absolute imports like `@/components/Button`.

---

Part of the **[bluehop](https://github.com/priyankuhazarika/bluehop)** toolkit — a set of
shareable project configs. Pairs naturally with
[`bluehop-eslint-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-eslint-config)
and [`bluehop-prettier-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-prettier-config).
