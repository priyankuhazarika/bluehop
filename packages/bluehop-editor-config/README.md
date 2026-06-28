# @sleepingasteroid/bluehop-editor-config

Shared `.editorconfig` + VSCode workspace settings, applied into a project with one command.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-editor-config
```

## Use

```bash
npx phz-editor-config        # writes files, skipping any that already exist
npx phz-editor-config --force  # overwrite existing files
```

Creates:

- `.editorconfig`
- `.vscode/settings.json` — format on save, ESLint flat config, Prettier as default formatter
- `.vscode/extensions.json` — recommends the ESLint / Prettier / EditorConfig extensions

These are copied (not symlinked) so you can tweak them per project. Re-run after pulling a
newer version of this package to refresh them with `--force`.
