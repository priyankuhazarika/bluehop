# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository. These instructions OVERRIDE default behavior — follow them exactly.

> Generalized template. Delete the parts that don't apply, fill the `<…>` placeholders, and
> keep the reference docs in sync as the project grows.

## Project Context

- **What it is:** <one-line description of the product>
- **Stack:** <e.g. Next.js + TypeScript + PostgreSQL, or Expo + TypeScript>
- **Reference docs** (read these before implementing features or making architectural decisions):
  - `@docs/PRD.md` — Product Requirements
  - `@docs/ARCHITECTURE.md` — System Architecture
  - `@docs/MODULES.md` — Module Definitions
  - `@docs/UI-DESIGN/` — Design System reference

## Coding Standards

**TypeScript:** Strict mode. No `any`. Use `interface` for public-facing APIs, `type` for
internal unions/intersections.

**Naming:**

- Components: `PascalCase` → `UserProfileCard.tsx`
- Functions/variables: `camelCase` → `fetchUserOrders`
- Constants: `SCREAMING_SNAKE_CASE` → `MAX_RETRY_COUNT`
- Files: `kebab-case` → `order-service.ts`
- DB tables: `snake_case` → `user_orders`

**Exports:** Named exports only — no default exports (framework-mandated exceptions aside,
e.g. Next.js pages/route handlers).

**Imports:** Absolute aliases (`@/components/...`), not deep relative paths.

**Error logging:** Always log errors on the server side wherever an error is caught/handled,
with a path that identifies the source plus the actual error object.

**Formatting (Prettier):** Single quotes, 2-space indent, no semicolons. (Enforced by
`@sleepingasteroid/bluehop-prettier-config` — don't hand-format.)

**Linting (ESLint):** All warnings are errors. Key rules (from
`@sleepingasteroid/bluehop-eslint-config`):

- `no-console` — only in dedicated logging utilities
- `react-hooks/exhaustive-deps` — always required
- `@typescript-eslint/no-unused-vars` — error
- `@typescript-eslint/no-explicit-any` — error

**DRY:** Don't repeat code. Extract shared functions, constants, and types when used by
multiple files.

**Readability:** Write clean, readable code a new developer can follow easily.

**Standards:** Follow current industry best practices.

**Dependencies:** Don't hand-pick version numbers — install with the package manager so the
latest compatible version is resolved.

## Architecture Conventions

- Pure functions with no hidden dependencies or side effects.
- Side effects isolated behind service functions — not inlined in components or hooks.
- Components receive data via props rather than fetching directly; keep data-fetching in
  hooks and rendering in components.

## Typecheck

Run a typecheck after every series of code changes before considering a task done:

```bash
npx tsc --noEmit
```

Fix all type errors before reporting completion.

## Testing

- Write meaningful unit tests that add real value — no junk or flaky tests.
- Prefer testing pure functions and isolated service functions.
- Colocate `*.test.ts` next to the source file.
- Mock all network and DB calls.

## Commits

Use Conventional Commits (enforced by `@sleepingasteroid/bluehop-git-hooks`), e.g.
`feat(orders): add partial refund flow`.
