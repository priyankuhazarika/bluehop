# bluehop

A reusable, open-source project setup — ESLint, Prettier, TypeScript, git hooks, editor
settings, and a `CLAUDE.md` — packaged so any new project can pull in the bits it needs and
be configured in minutes.

## What is this and why does it exist?

Every new project needs the same boring setup: linting rules, formatting rules, a strict
TypeScript config, commit hooks, and so on. Copy-pasting that between repos means they drift
apart and fixing one thing means fixing it everywhere by hand.

**bluehop** solves that. It's one repository containing several small, independent config
**packages**. Instead of copy-pasting config, a project just installs the packages it wants:

- A **web app** pulls the ESLint + Prettier + TypeScript configs.
- A **mobile app** pulls the same, but uses the React Native variants.
- A **backend service** pulls the Node variants.

Each package is published to the **public npm registry**, so installing them is just
`pnpm add`, like any other dependency — no auth or registry config required. Update a package
here, bump its version, and every project can pull the update.

> The packages are published under the `@sleepingasteroid` npm organization, e.g.
> `@sleepingasteroid/bluehop-eslint-config`. "bluehop" is the name of this repo/toolkit as a whole.

## The packages

| Package                                                                         | What you get                                                   |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`@sleepingasteroid/bluehop-eslint-config`](packages/bluehop-eslint-config)     | ESLint flat configs: base / react / next / node / react-native |
| [`@sleepingasteroid/bluehop-prettier-config`](packages/bluehop-prettier-config) | Prettier config (single quotes, no semicolons, 2-space)        |
| [`@sleepingasteroid/bluehop-tsconfig`](packages/bluehop-tsconfig)               | Strict TypeScript presets                                      |
| [`@sleepingasteroid/bluehop-git-hooks`](packages/bluehop-git-hooks)             | husky + lint-staged + commitlint, set up with one command      |
| [`@sleepingasteroid/bluehop-editor-config`](packages/bluehop-editor-config)     | `.editorconfig` + VSCode settings                              |
| [`@sleepingasteroid/bluehop-claude-md`](packages/bluehop-claude-md)             | A ready-to-fill `CLAUDE.md` with the coding standards          |

Each package has its own README with full details.

---

## Using bluehop in another project (pulling it in)

The packages are public on npm, so there's nothing to authenticate — just install and wire
them up.

### Step 1 — Install the packages you need

Pick the row matching your project type and run it:

| Project type           | Install command                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Web (React / Next)** | `pnpm add -D eslint prettier typescript @sleepingasteroid/bluehop-{eslint-config,prettier-config,tsconfig,git-hooks,editor-config,claude-md}` |
| **Mobile (Expo / RN)** | same as above (use the `reactNative` ESLint variant + `react-native.json` tsconfig)                                                           |
| **Desktop (Electron)** | same as above (`react` variant for the UI, `node` for the main process)                                                                       |
| **Backend (Node API)** | `pnpm add -D eslint prettier typescript @sleepingasteroid/bluehop-{eslint-config,prettier-config,tsconfig,git-hooks,claude-md}`               |

(You also install `eslint`, `prettier`, and `typescript` because they're the tools the
configs plug into.)

> The `@sleepingasteroid/bluehop-{a,b,c}` shorthand is brace expansion — it works in **bash** and
> **zsh**, but not in **fish** or Windows **cmd**. In those shells, list the packages
> separately, e.g. `pnpm add -D @sleepingasteroid/bluehop-eslint-config
@sleepingasteroid/bluehop-prettier-config @sleepingasteroid/bluehop-tsconfig ...`.

### Step 2 — Wire them up

```js
// eslint.config.js  — pick one: base / node / react / next / reactNative
import { react } from '@sleepingasteroid/bluehop-eslint-config'
export default [...react]
```

```jsonc
// package.json — point Prettier at the shared config
{ "prettier": "@sleepingasteroid/bluehop-prettier-config" }
```

```jsonc
// tsconfig.json — extend the right preset
// options: base.json / node.json / react-library.json / nextjs.json / react-native.json
{ "extends": "@sleepingasteroid/bluehop-tsconfig/nextjs.json" }
```

Then run the one-command setups for the rest:

```bash
npx phz-hooks-init        # installs git hooks (auto-lint on commit + Conventional Commits)
npx phz-editor-config     # writes .editorconfig and .vscode settings
npx phz-claude-md         # writes a CLAUDE.md you can fill in
```

That's it — the project is configured.

---

## Developing & publishing bluehop (this repo)

> New here? **[CONTRIBUTING.md](CONTRIBUTING.md)** is the full step-by-step guide in plain
> English — making a change, recording a changeset, and how a new version gets published. The
> summary below is the quick version.

### Local development

```bash
pnpm install              # install everything
pnpm lint                 # lint this repo using its own eslint-config
pnpm format:check         # check formatting using its own prettier-config
pnpm typecheck            # type-check using its own tsconfig
```

This repo **uses its own configs** (dogfooding), so if a config is broken, these commands
catch it here before it ever reaches a real project.

### How publishing works

Publishing is automatic and driven by [Changesets](https://github.com/changesets/changesets):

1. **Make your change** to a package (e.g. tweak an ESLint rule).
2. **Record it:** run `pnpm changeset`, select the package(s) you changed, choose the bump
   type (patch / minor / major), and write a one-line summary. This creates a small file in
   `.changeset/` — commit it with your change.
3. **Push to `main`.** The [release workflow](.github/workflows/release.yml) sees the
   changeset and opens a **"Version Packages" pull request** that bumps versions and updates
   changelogs.
4. **Merge that PR.** Merging publishes the changed packages to the public npm registry
   automatically. Done.

You never bump version numbers by hand — the changeset does it.

### First-time setup (once)

1. Create the GitHub repo `bluehop` under your account and push this code to it.
2. Create the **`@sleepingasteroid` organization** on npm (the scope the packages publish under).
3. Generate an npm **automation access token** (npm → Access Tokens → Generate → Automation)
   and add it to the GitHub repo as an Actions secret named **`NPM_TOKEN`**. The release
   workflow uses it to publish; the version PR uses the built-in `GITHUB_TOKEN`.

Scoped packages are published publicly via `publishConfig.access: "public"` (set in every
package) and `"access": "public"` in `.changeset/config.json`.

### Publishing manually (rare fallback)

```bash
npm login                 # or: export NPM_TOKEN=your_npm_automation_token
pnpm release
```

---

## The rules this repo follows

- **Never hand-pick dependency versions.** Always add deps with `pnpm add` so the latest is
  resolved — don't type version numbers yourself.
- **Named exports only**, single quotes, no semicolons, 2-space indent (enforced by the
  configs here).
- **Conventional Commits** for messages, e.g. `feat(eslint): allow default export in app dir`.

## Contributing

Issues and pull requests are welcome — open one at
[github.com/priyankuhazarika/bluehop/issues](https://github.com/priyankuhazarika/bluehop/issues).
See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full plain-English walkthrough. In short:
each change needs a changeset (`pnpm changeset`) so the affected packages get versioned and
published on merge, and commits follow Conventional Commits (enforced by the git hooks)

## License

[MIT](LICENSE) © Priyanku Hazarika
