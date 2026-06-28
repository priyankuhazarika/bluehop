# @sleepingasteroid/bluehop-claude-md

> A ready-made `CLAUDE.md` starter that teaches AI coding tools your project's standards — drop
> it in, fill the blanks, done.

## What is this?

A `CLAUDE.md` is an instructions file that [Claude Code](https://claude.com/claude-code) (and
similar AI coding assistants) read automatically to learn how _your_ project works — its coding
standards, conventions, and rules. Writing a good one from scratch for every project is
repetitive.

This package gives you a **ready-made template**, dropped into your project with one command. It
already spells out the house standards (TypeScript usage, naming, exports, ESLint/Prettier
rules, testing, Conventional Commits) and leaves `<…>` placeholders for the project-specific
bits you fill in.

## Why use it?

- **Better AI output** — the assistant follows your conventions instead of guessing.
- **No blank page** — start from a solid, opinionated template.
- **Matches the rest of bluehop** — the standards line up with the ESLint, Prettier, and
  TypeScript configs, so the AI and your tooling agree.

## Install & use

```bash
pnpm add -D @sleepingasteroid/bluehop-claude-md
npx bluehop-claude-md          # writes CLAUDE.md (won't overwrite an existing one)
npx bluehop-claude-md --force  # overwrite an existing CLAUDE.md
```

Then open the generated `CLAUDE.md`, fill in the `<…>` placeholders (project description, tech
stack, links to your docs), and delete any sections that don't apply to your project.

---

Part of the **[bluehop](https://github.com/priyankuhazarika/bluehop)** toolkit — a set of
shareable project configs. The standards it encodes match
[`bluehop-eslint-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-eslint-config),
[`bluehop-prettier-config`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-prettier-config),
and [`bluehop-tsconfig`](https://www.npmjs.com/package/@sleepingasteroid/bluehop-tsconfig).
