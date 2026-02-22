# AGENTS.override.template.md

Template for optional local strict overrides.

Usage:

1. Copy this file to `AGENTS.override.local.md`.
2. Keep `AGENTS.override.local.md` untracked.
3. Add only stricter personal or machine-specific constraints.
4. Never use local overrides to weaken `AGENTS.md` or `AGENTS.repo.md`.

---

## Local Environment Constraints (Example)

- Prefer `pnpm` instead of `npm` on this machine.
- Require a VPN before hitting internal services.

## Extra Personal Quality Gates (Example)

- Run an additional smoke pass before requesting review.
- Require screenshots for all UI-affecting changes.

## Local Tooling Availability (Example)

- `chrome` binary path: `/usr/bin/google-chrome`
- `node` version manager: `nvm`

