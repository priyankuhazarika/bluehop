# @sleepingasteroid/bluehop-editor-config

> Drop a shared `.editorconfig` and VS Code workspace settings into any project with one
> command, so every editor behaves the same way.

## What is this?

Different editors (and different people) use different defaults — tabs vs spaces, line endings,
whether code formats on save. That leads to noisy diffs and "works on my machine" formatting
fights.

This package fixes that by giving you ready-made editor settings you can copy into any project
with one command:

- An [`.editorconfig`](https://editorconfig.org) — a standard file most editors read
  automatically, so basics like indentation and line endings are consistent for everyone.
- **VS Code workspace settings** — turns on format-on-save, sets Prettier as the default
  formatter, and enables ESLint's flat config.
- **VS Code extension recommendations** — so collaborators get prompted to install the right
  extensions.

## Why use it?

- **Consistent editor behavior** for everyone on the project, automatically.
- **One command** instead of copy-pasting dotfiles between repos.
- **Files are copied, not linked**, so you can still tweak them per project.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-editor-config
```

## Use

```bash
npx bluehop-editor-config          # writes the files, skipping any that already exist
npx bluehop-editor-config --force  # overwrite existing files
```

This creates:

- `.editorconfig`
- `.vscode/settings.json` — format on save, ESLint flat config, Prettier as default formatter
- `.vscode/extensions.json` — recommends the ESLint / Prettier / EditorConfig extensions

When you pull a newer version of this package, re-run with `--force` to refresh the files.

---

Part of the **[bluehop](https://github.com/priyankuhazarika/bluehop)** toolkit — a set of
shareable project configs. Best alongside
[`bluehop-eslint-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-eslint-config)
and [`bluehop-prettier-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-prettier-config),
which the editor settings are tuned for.
