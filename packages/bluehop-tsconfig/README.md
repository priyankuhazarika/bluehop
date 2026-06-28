# @sleepingasteroid/bluehop-tsconfig

Strict, shareable TypeScript presets. Pick the one matching your project and `extends` it.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-tsconfig typescript
```

## Use

```jsonc
// tsconfig.json
{
  "extends": "@sleepingasteroid/bluehop-tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
  },
  "include": ["src"],
}
```

## Presets

| Preset               | For                                    |
| -------------------- | -------------------------------------- |
| `base.json`          | Foundation for the others (strict)     |
| `node.json`          | Node services / CLIs (emits to `dist`) |
| `react-library.json` | Bundled React component libraries      |
| `nextjs.json`        | Next.js apps                           |
| `react-native.json`  | React Native / Expo apps               |

All presets enable `strict` plus `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `noImplicitOverride`, and friends. Set `baseUrl` / `paths`
in your own `tsconfig.json` for absolute imports (`@/...`).
