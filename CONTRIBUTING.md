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

You don't run any publish command yourself. A robot (a GitHub Action) does it. Here's the whole
thing in the simplest words.

### The 30-second version

1. You push your change **plus a changeset note** to `main`.
2. The robot reads the note and opens a **"Version Packages" pull request** that raises the
   version numbers.
3. You **merge that pull request.**
4. Merging it makes the robot **publish the packages to npm.**

That's it. Two merges total: your change, then the robot's version pull request.

### What's actually happening (with the branch explained)

Think of the changeset note as a sticky note that says _"next release, bump these packages."_
Here's the journey, step by step:

1. **You push your change + the changeset note to `main`.** Nothing is published yet — the note
   is just sitting there saying "there's an unreleased change."

2. **The robot wakes up** (the GitHub Action runs on every push to `main`). It sees the note and
   does the version bump _on a separate branch_, **not** directly on `main`. That branch is
   always named **`changeset-release/main`**. On it, the robot:
   - raises the version numbers (e.g. `0.1.0` → `0.2.0`),
   - writes the `CHANGELOG.md` entries from your note,
   - deletes the note (it's been used up).

   > **Why a separate branch?** So your `main` stays clean and you get a chance to _review_ the
   > version bump before it becomes official. The robot never edits `main` on its own.

3. **The robot opens a pull request** from `changeset-release/main` → `main`, titled
   **"Version Packages."** A pull request is just a proposal: _"here are the version changes I
   want to put into `main` — approve them?"_

4. **You merge that pull request.** Now the new version numbers land on `main`.

5. **Merging triggers the robot again.** This time there's no leftover note, but it sees the
   versions on `main` are newer than what's on npm — so it runs the publish and **uploads the
   packages to the npm registry.** "Deployed" here just means _uploaded to npm_, the place
   people download them from with `pnpm add`.

After that second merge, the packages are live on [npmjs.com](https://www.npmjs.com) within a
minute or two.

### Picture it

```
your change + note  ──push──▶  main
                                 │  robot reads the note
                                 ▼
                       changeset-release/main   (robot bumps versions here)
                                 │  robot opens "Version Packages" PR
                                 ▼
                      you MERGE the PR  ──▶  main (now has new versions)
                                 │  robot runs again
                                 ▼
                          published to npm  📦
```

> **Tip:** you can let several changes pile up — each adds its own note, and the single
> "Version Packages" PR bundles them all into one release when you merge it.

> **Heads-up:** the `changeset-release/main` branch is the robot's scratch branch. Don't edit it
> by hand. If a release ever gets stuck on it (e.g. an error like _"No commits between main and
> changeset-release/main"_), the fix is to delete that branch and push again — the robot
> recreates it cleanly.

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
