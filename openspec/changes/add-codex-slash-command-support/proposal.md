## Why
- Codex (the VS Code extension formerly known as Codeium Chat) exposes "slash commands" by reading Markdown prompt files from `~/.codex/prompts/`. Each file name becomes the `/command` users can run, with numbered placeholders (`$1`, `$2`, …) bound to the arguments they supply. The workflow screenshot shared by Kevin Kern ("Codex problem analyzer") shows the format OpenSpec should target so teams can invoke curated workflows straight from the chat palette.
- Teams already rely on OpenSpec to manage the slash-command surface area for Claude, Cursor, OpenCode, Kilo Code, and Windsurf. Leaving Codex out forces them to manually copy/paste OpenSpec guardrails into `~/.codex/prompts/*.md`, which drifts quickly and undermines the "single source of truth" promise of the CLI.
- Codex commands live outside the repository (under the user's home directory), so shipping an automated configurator that both scaffolds the prompts and keeps them refreshed via `openspec update` eliminates error-prone manual steps and keeps OpenSpec instructions synchronized across assistants.

## What Changes
- Add Codex to the `openspec init` tool picker with the same "already configured" detection we use for other editors, wiring an implementation that writes managed Markdown prompts to `.codex/prompts/` (creating the directory when needed) with OpenSpec marker blocks.
- Produce three Codex prompt files—`openspec-proposal.md`, `openspec-apply.md`, and `openspec-archive.md`—whose content mirrors the shared slash-command templates while adapting to Codex's numbered argument placeholders (e.g., `$1` for the change identifier or follow-up question text).
- Teach `openspec update` to refresh existing Codex prompts in-place (and only when they already exist), preserving file permissions and the surrounding unmanaged content so teams can rely on the CLI for ongoing upkeep.
- Document Codex support alongside other slash-command integrations and add regression coverage that exercises init/update behaviour against a temporary `.codex/prompts/` directory.

## Impact
- Specs: `cli-init`, `cli-update`
- Code: `src/core/config.ts`, `src/core/configurators/slash/*`, `src/core/templates/slash-command-templates.ts`, CLI tool summaries, docs
- Tests: integration coverage for Codex prompt scaffolding and refresh logic
- Docs: README and CHANGELOG entries announcing Codex slash-command support

## Current Spec Reference
- `specs/cli-init/spec.md`
  - Requirements cover init UX, directory scaffolding, AI tool configuration, and the existing slash-command support for Claude Code, Cursor, and OpenCode.
  - Our `## MODIFIED` delta in `changes/.../specs/cli-init/spec.md` copies the full "Slash Command Configuration" requirement (header, description, and all scenarios) before appending the new Codex scenario so archiving will retain every prior scenario.
- `specs/cli-update/spec.md`
  - Requirements define update preconditions, template refresh behavior, and slash-command refresh logic for Claude Code, Cursor, and OpenCode.
  - The corresponding delta preserves the entire "Slash Command Updates" requirement while adding the Codex refresh scenario, ensuring the archive workflow replaces the block without losing the existing scenarios or the "Missing slash command file" guardrail.
