## 1. Research Factory command conventions
- [x] 1.1 Review Factory docs for `.factory/commands` discovery, slug rules, Markdown frontmatter, and executable requirements.

## 2. CLI implementation
- [x] 2.1 Add a `factory` command group with a `slash <name>` subcommand in `src/cli/index.ts`.
- [x] 2.2 Implement generator logic that slugs names, creates the correct target directory (`.factory/commands` or `~/.factory/commands`), and writes Markdown or executable templates without clobbering existing files unless `--force` is used.
- [x] 2.3 Support options for description, argument hints, executable mode, personal scope, and force overwrites.

## 3. Documentation and validation
- [x] 3.1 Add a new spec describing the Factory CLI scaffold behavior with scenarios for Markdown and executable outputs.
- [x] 3.2 Update docs/quickstart material so agents understand how to generate Factory slash commands with the new CLI command.
- [x] 3.3 Run `openspec validate add-factory-slash-scaffold --strict` and ensure checklists are updated.
