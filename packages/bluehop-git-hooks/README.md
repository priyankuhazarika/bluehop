# @sleepingasteroid/bluehop-git-hooks

> Automatically lint, format, and check your commit messages every time you commit — set up
> with a single command.

## What is this?

**Git hooks** are scripts that git runs automatically at certain moments — for example, right
before a commit is created. They're great for catching problems _before_ they ever land in your
history, but wiring them up normally means installing and configuring three separate tools:

- [**husky**](https://typicode.github.io/husky/) — installs the git hooks
- [**lint-staged**](https://github.com/lint-staged/lint-staged) — runs linters/formatters on
  just the files you're committing
- [**commitlint**](https://commitlint.js.org) — checks your commit message follows a convention

This package bundles all three and sets them up for you with **one command**. The hooks call
this package's own wrapper scripts, so everything resolves reliably under pnpm — you don't
install husky, lint-staged, or commitlint yourself.

## What you get

- **On every commit**, your staged files are auto-fixed with ESLint and Prettier.
- **Bad commit messages are rejected** — messages must follow
  [Conventional Commits](https://www.conventionalcommits.org), e.g.
  `feat(auth): add password reset`.
- **It survives fresh clones** — a `prepare` script reinstalls the hooks after `pnpm install`.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-git-hooks
npx bluehop-hooks-init
```

`bluehop-hooks-init` sets everything up (it's safe to re-run anytime):

- initializes husky (creates `.husky/`)
- writes `.husky/pre-commit` → runs `lint-staged`
- writes `.husky/commit-msg` → validates the message against Conventional Commits
- scaffolds a `lint-staged.config.mjs` you can customize
- adds `"prepare": "bluehop-hooks-init"` to your `package.json` so hooks reinstall after a clone

The commit-message check is self-contained — it always enforces Conventional Commits and needs
no `commitlint.config` file in your project.

**Requirements:** a git repo (run `git init` first) and `eslint` + `prettier` available in the
project (they come with
[`bluehop-eslint-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-eslint-config)
and [`bluehop-prettier-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-prettier-config)).

## What runs by default

- **pre-commit:** ESLint `--fix` + Prettier `--write` on staged JS/TS files; Prettier on staged
  JSON/Markdown/CSS/YAML files.
- **commit-msg:** rejects any message that isn't a Conventional Commit.

## Customizing what runs on commit

Edit the `lint-staged.config.mjs` that was scaffolded into your project. It starts by
re-exporting the shared defaults, so you only add what's different:

```js
// lint-staged.config.mjs
import shared from '@sleepingasteroid/bluehop-git-hooks/lint-staged'

export default {
  ...shared,
  '*.rs': ['cargo fmt --'], // e.g. also format Rust files
}
```

---

Part of the **[bluehop](https://github.com/priyankuhazarika/bluehop)** toolkit — a set of
shareable project configs.
