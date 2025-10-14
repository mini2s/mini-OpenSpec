## ADDED Requirements
### Requirement: Slash command scaffolding
The CLI MUST provide `openspec factory slash <name>` to scaffold Factory Droid custom slash commands following the documented conventions.

#### Scenario: Create workspace markdown command
- **GIVEN** the current directory has no `.factory/commands` folder
- **WHEN** `openspec factory slash "Code Review" --description "Send a code review checklist" --argument-hint "<branch-name>"` runs without additional flags
- **THEN** the CLI creates `.factory/commands/code-review.md`
- **AND** the file contains YAML frontmatter with `description` and `argument-hint`
- **AND** the body includes a placeholder referencing `$ARGUMENTS`
- **AND** the command slug is lowercase with spaces converted to hyphens and non URL-safe characters removed.

#### Scenario: Personal command directory
- **WHEN** `openspec factory slash deploy --personal` is executed
- **THEN** the CLI creates (or reuses) the `~/.factory/commands` directory
- **AND** writes `deploy.md` into that directory instead of the workspace folder.

#### Scenario: Executable command template
- **WHEN** `openspec factory slash deploy --executable` runs
- **THEN** the CLI writes `.factory/commands/deploy.sh`
- **AND** the file begins with a shebang line (e.g., `#!/usr/bin/env bash`)
- **AND** the template includes `set -euo pipefail`
- **AND** `$1` receives the first argument passed to the slash command.

#### Scenario: Prevent accidental overwrite
- **GIVEN** `.factory/commands/checklist.md` already exists
- **WHEN** `openspec factory slash checklist` runs without `--force`
- **THEN** the CLI aborts with an explanatory error instead of overwriting the file.

#### Scenario: Force overwrite of existing command
- **WHEN** `openspec factory slash checklist --force` runs and the file exists
- **THEN** the CLI replaces the file contents with the new template.

### Requirement: Option handling and feedback
The CLI MUST provide helpful options and output when generating commands.

#### Scenario: Display success message
- **WHEN** a command file is generated successfully
- **THEN** the CLI prints the absolute path and how to trigger the slash command (e.g., `/code-review`).

#### Scenario: Argument validation
- **WHEN** the provided name is empty or resolves to an empty slug
- **THEN** the CLI exits with a validation error explaining that only letters, numbers, spaces, dashes, and underscores are supported.

#### Scenario: Description and argument hint defaults
- **WHEN** description or argument hint values are omitted
- **THEN** the CLI still emits valid frontmatter and leaves missing fields blank so Factory can register the command.
