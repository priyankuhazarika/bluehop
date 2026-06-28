# @sleepingasteroid/bluehop-claude-md

A generalized, project-agnostic `CLAUDE.md` template encoding the house coding standards.

## Install

```bash
pnpm add -D @sleepingasteroid/bluehop-claude-md
npx phz-claude-md          # writes CLAUDE.md (refuses to overwrite without --force)
npx phz-claude-md --force  # overwrite an existing CLAUDE.md
```

Then fill in the `<…>` placeholders (project description, stack, reference docs) and delete
the sections that don't apply. The standards (TypeScript, naming, exports, ESLint/Prettier,
testing, Conventional Commits) line up with the other `@sleepingasteroid/bluehop-*` config packages.
