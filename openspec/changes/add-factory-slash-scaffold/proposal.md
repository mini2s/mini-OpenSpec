## Why
Factory Droid lets engineers speed up reviews and deployment rituals by loading custom slash commands from `.factory/commands`. Without tooling, every team member has to remember naming rules, directory locations, and Markdown frontmatter details from the Factory docs. This friction keeps the workflow underused and risks inconsistently formatted prompts.

## What Changes
- Add an `openspec factory slash <name>` command that scaffolds Factory Droid custom commands as Markdown prompts or executable scripts using the conventions from the Factory documentation.
- Provide options for setting description text, argument hints, personal vs workspace scope, and executable mode so teams can generate the files they need without manual boilerplate.
- Update documentation/specs to describe the Factory integration and ensure the generated files respect Factory’s slugging and directory rules.

## Impact
- Affected specs: `specs/factory-cli`
- Affected code: `src/cli/index.ts`, `src/commands/factory.ts`, `src/utils/slug.ts`, `README.md`
