# Changesets

This folder is managed by [changesets](https://github.com/changesets/changesets).

To record a change for the next release, run:

```bash
pnpm changeset
```

Pick the affected packages and a bump type (patch / minor / major), and write a short
summary. The generated markdown file is committed alongside your code. On `main`, the
release workflow turns accumulated changesets into a "Version Packages" PR; merging it
publishes the bumped packages to GitHub Packages.
