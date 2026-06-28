# Contributing to bluehop

This is the full, plain-English guide to working on bluehop: how to make a change, check it,
and get a new version published to npm. No prior knowledge assumed — follow it top to bottom.

If you only remember one thing: **every change needs a "changeset" note, and merging that to
`main` publishes the new version automatically. You never type version numbers yourself.**

---

## 1. One-time setup (do this once)

You need [Node.js](https://nodejs.org) (version 20 or newer) and
[pnpm](https://pnpm.io/installation) installed.

```bash
git clone https://github.com/priyankuhazarika/bluehop.git
cd bluehop
pnpm install        # downloads everything the repo needs
```

That's it. You're ready to make changes.

---

## 2. How the repo is laid out

Everything lives under `packages/`. Each folder there is **its own npm package**:

| Folder                             | Published as                                |
| ---------------------------------- | ------------------------------------------- |
| `packages/bluehop-eslint-config`   | `@sleepingasteroid/bluehop-eslint-config`   |
| `packages/bluehop-prettier-config` | `@sleepingasteroid/bluehop-prettier-config` |
| `packages/bluehop-tsconfig`        | `@sleepingasteroid/bluehop-tsconfig`        |
| `packages/bluehop-git-hooks`       | `@sleepingasteroid/bluehop-git-hooks`       |
| `packages/bluehop-editor-config`   | `@sleepingasteroid/bluehop-editor-config`   |
| `packages/bluehop-claude-md`       | `@sleepingasteroid/bluehop-claude-md`       |

To change a rule, edit the file inside the matching folder. For example, to change an ESLint
rule, edit `packages/bluehop-eslint-config/base.js` (or `react.js`, `node.js`, etc.).

---

## 3. The everyday loop (the short version)

Every change you make follows the same five steps:

1. **Edit** the file you want to change.
2. **Check** your work: `pnpm lint && pnpm format:check && pnpm typecheck`.
3. **Record** the change: `pnpm changeset` (explained below — this is the important one).
4. **Commit** everything (your change + the changeset file).
5. **Push** and open a pull request.

After it's merged, publishing happens on its own. The rest of this guide explains each step.

---

## 4. Making and checking a change

Make your edit, then run the three checks. The repo uses its **own** configs on itself, so
these are the same rules everyone else gets:

```bash
pnpm lint            # checks for code mistakes / rule violations
pnpm format:check    # checks spacing, quotes, semicolons, etc.
pnpm typecheck       # checks TypeScript types
```

If `lint` or `format:check` complains, you usually don't need to fix it by hand — let the
tools do it:

```bash
pnpm lint:fix        # auto-fixes most lint problems
pnpm format          # auto-fixes all formatting
```

Re-run the checks until all three pass with no errors. **Don't move on until they're clean** —
the same checks run again automatically when you commit and in CI.

---

## 5. Writing the commit message

Commit messages must follow **Conventional Commits** (a hook checks this automatically and
will reject a bad message). The shape is:

```
type(scope): short description
```

- **type** — what kind of change it is. The common ones:
  - `feat` — a new feature or capability
  - `fix` — a bug fix
  - `docs` — documentation only
  - `chore` — maintenance (e.g. bumping dependencies)
  - `refactor` — code change that doesn't add a feature or fix a bug
- **scope** — which package it touches, e.g. `eslint`, `tsconfig`, `git-hooks` (optional but
  helpful).
- **description** — a short, lowercase summary of what you did.

Examples:

```
feat(eslint): allow default export in the app directory
fix(tsconfig): correct the module setting for Node
docs(readme): explain the npm publishing flow
chore(deps): update eslint plugins
```

---

## 6. The changeset (the most important step)

A **changeset** is a tiny note that says _"these packages changed, and here's how much."_ It's
how versions get bumped and changelogs get written — automatically. **If you skip this, your
change will not get published.**

Run:

```bash
pnpm changeset
```

It asks you a few questions:

1. **Which packages changed?** Use the arrow keys and spacebar to tick the ones you edited,
   then Enter.
2. **How big is the change?** Pick `patch`, `minor`, or `major` (see the next section).
3. **Write a summary.** One sentence describing the change — this becomes the changelog line
   that users see.

This creates a small file in the `.changeset/` folder (a random name like
`brave-lions-sing.md`). **Commit that file together with your code change.** It's not junk —
it's the instruction the robot uses to publish.

### Which size do I pick? (patch / minor / major)

Version numbers look like `1.4.2` → **major . minor . patch**. Pick based on the impact on
people using the package:

- **patch** (`1.4.2` → `1.4.3`) — a small fix or tweak. Nothing about how people use it
  changes. _Example: fixed a typo in a rule, bumped a dependency._
- **minor** (`1.4.2` → `1.5.0`) — you added something new, but existing setups keep working.
  _Example: added a new ESLint variant._
- **major** (`1.4.2` → `2.0.0`) — a **breaking change**: someone who upgrades might have to
  change their own project to keep things working. _Example: turned a lint rule into an error,
  removed a config option, renamed an export._

When in doubt: a bug fix is `patch`, a new addition is `minor`, and anything that could break
someone else's project is `major`.

---

## 7. Sending your change

```bash
git add .
git commit -m "fix(tsconfig): correct the module setting for Node"
git push
```

Then open a pull request on GitHub. That's all you have to do — the publishing is automatic
from here.

---

## 8. How a new version actually gets published (automatic)

You don't run any publish command. Here's the whole flow once your change is on `main`:

1. You merge your change (with its changeset file) into `main`.
2. A GitHub Action notices the changeset and **opens a new pull request** titled
   **"Version Packages."** This PR:
   - bumps the version numbers of the changed packages,
   - updates their `CHANGELOG.md` files with your summary,
   - deletes the changeset file (its job is done).
3. You review and **merge the "Version Packages" PR.**
4. Merging it triggers the Action again, which this time **publishes the new versions to npm**.

So there are **two merges**: first your actual change, then the auto-generated "Version
Packages" PR that does the release. After the second merge, the new versions are live on npm
within a minute or two.

> You can let several changes pile up and release them together — each one adds its own
> changeset, and the single "Version Packages" PR bundles them all when you're ready to merge
> it.

---

## 9. One-time account setup (only needed once, ever)

For the automatic publishing to work, two things must exist (you've likely done these already):

1. The **`@sleepingasteroid` organization** on npm — this owns the `@sleepingasteroid/bluehop-...` names.
2. A secret named **`NPM_TOKEN`** in the GitHub repo settings
   (Settings → Secrets and variables → Actions). Create the token on npm under
   **Access Tokens → Generate New Token → Automation**, then paste it in as `NPM_TOKEN`. The
   release Action uses this to log in to npm and publish.

If publishing ever fails with an authentication error, this token has usually expired —
generate a new one and update the secret.

---

## 10. Updating dependencies

Don't type version numbers by hand. Let pnpm pick the latest compatible version:

```bash
pnpm add -D <package-name>                                  # for the whole repo
pnpm --filter @sleepingasteroid/bluehop-eslint-config add <package-name>     # for one package
```

Then add a changeset (`chore(deps): ...`, usually a `patch`) just like any other change.

---

## 11. Publishing by hand (rare — only if the Action is broken)

You should almost never need this. If you must:

```bash
npm login            # or set NPM_TOKEN in your environment
pnpm version         # applies pending changesets: bumps versions + changelogs
pnpm release         # publishes the bumped packages to npm
```

---

## Cheat sheet

| I want to…                  | Command                                            |
| --------------------------- | -------------------------------------------------- |
| Install everything          | `pnpm install`                                     |
| Check my code               | `pnpm lint && pnpm format:check && pnpm typecheck` |
| Auto-fix lint + formatting  | `pnpm lint:fix && pnpm format`                     |
| Record a change for release | `pnpm changeset`                                   |
| Add a dependency            | `pnpm add -D <name>`                               |
| Publish by hand (rare)      | `pnpm version && pnpm release`                     |

---

## Common problems

- **"My change didn't get published."** You probably forgot the changeset. Run `pnpm changeset`,
  commit the file it creates, and push. No changeset = no release.
- **My commit was rejected.** The message isn't in `type(scope): description` form. See
  section 5 and try again.
- **`lint` or `format:check` fails.** Run `pnpm lint:fix` and `pnpm format`, then re-check.
- **Publishing failed with an auth/login error.** The `NPM_TOKEN` secret is missing or expired
  (section 9).
