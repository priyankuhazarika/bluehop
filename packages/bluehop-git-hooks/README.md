# @sleepingasteroid/bluehop-git-hooks

One command to wire up **husky + lint-staged + commitlint** (Conventional Commits).

All three tools ship as dependencies of this package, and the git hooks call this
package's wrapper bins — so they resolve reliably under pnpm without you installing husky,
lint-staged or commitlint separately.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-git-hooks
npx phz-hooks-init
```

`phz-hooks-init` will:

- initialize husky (`.husky/`)
- write `.husky/pre-commit` → runs `lint-staged`
- write `.husky/commit-msg` → validates the message against Conventional Commits
- scaffold `lint-staged.config.mjs` re-exporting the shared default (edit it to customize)
- add `"prepare": "phz-hooks-init"` to `package.json` so hooks reinstall after a fresh clone

The commit-msg check is self-contained — it always enforces Conventional Commits and needs
no `commitlint.config` in your project.

Requires a git repo (`git init`) and that the project also has `eslint` + `prettier`
available (they come with `@sleepingasteroid/bluehop-eslint-config` and
`@sleepingasteroid/bluehop-prettier-config`).

## Default behavior

- **pre-commit:** ESLint `--fix` + Prettier `--write` on staged JS/TS, Prettier on staged
  JSON/MD/CSS/YAML.
- **commit-msg:** rejects messages that aren't Conventional Commits, e.g.
  `feat(auth): add password reset`.

## Customizing

Edit the scaffolded `lint-staged.config.mjs` in your project. It starts by re-exporting the
shared config:

```js
// lint-staged.config.mjs
import shared from '@sleepingasteroid/bluehop-git-hooks/lint-staged'

export default {
  ...shared,
  '*.rs': ['cargo fmt --'],
}
```
