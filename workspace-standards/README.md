# Workspace Standards — Read This First

Single source of truth for how any AI agent (Claude Code, Codex CLI, Cline,
GitHub Copilot, or a human) works in this repo. **My-ReactJS-Lab** — a study
project where an experienced Angular developer learns React and JavaScript
from scratch, building a mock asset-management app as the teaching vehicle.

This folder is the only place rules live. `CLAUDE.md`, `AGENTS.md`, and
`.clinerules/project-rules.md` still exist at their tool-specific
auto-discovery locations, but each is now just a short pointer to this
folder — never add real rules back into those files. Update the matching
file here instead, in the same turn a convention changes.

## Guardrails (non-negotiable)

| # | Rule | Why |
|---|------|-----|
| 1 | All study notes go in `LEARNING_NOTES.md` at the repo root — never create a second study/notes `.md` file, "temporary" or otherwise | One scannable book, not scattered cram sheets — see [documentation-standards.md](documentation-standards.md) |
| 2 | Every code change gets actually run (`npm start`, hit the route, confirm it compiles) before it's called done | Never claim something works without executing it |
| 3 | Verify any React/library version claim (web search) before stating it as fact | Training data goes stale; this repo should reflect the real current ecosystem |
| 4 | `D:\Le\Mega\Dev Projects\AIDLC Framework` is read-only — inspiration only, never edit or copy its content | Real company framework, unrelated product |
| 5 | Every response that touches files ends with a terse "Files changed" list | Changelog, not a re-explanation |

## Where the detail lives

- [project-context.md](project-context.md) — what this project actually is, who it's for, and why every feature doubles as a teaching example
- [documentation-standards.md](documentation-standards.md) — the exact chapter shape for `LEARNING_NOTES.md`, the Study Log workflow, communication style

## Where things end up

- The app itself → `src/` (Create React App layout)
- The living study reference → `LEARNING_NOTES.md` at the repo root — read its Study Log table first, it's the authoritative "what's already been studied" record
- Rules about how to work here → this folder, nowhere else

## Multiple agents on this repo

More than one AI coding tool opens this repo. Each auto-loads a different
file, so each now stays in place purely as a pointer:

- Claude Code → `CLAUDE.md` (repo root)
- Codex CLI → `AGENTS.md` (repo root)
- Cline → `.clinerules/project-rules.md`
- GitHub Copilot → `.github/copilot-instructions.md`, if/when one is added

All must keep pointing here and nowhere else. If a rule ever needs to
change, edit the relevant file in this folder — don't add detail back into
the pointer files.
