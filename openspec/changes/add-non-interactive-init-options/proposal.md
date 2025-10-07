## Why
The current `openspec init` command requires interactive prompts, preventing automation in CI/CD pipelines and scripted setups. Adding non-interactive options will enable programmatic initialization for automated workflows while maintaining the existing interactive experience as the default.

## What Changes
- Add CLI options `--tools`, `--all-tools`, and `--skip-tools` to `openspec init`
- Modify InitCommand to bypass interactive prompts when options are provided
- Update cli-init spec to document non-interactive behavior
- Add validation for tool selection arguments

## Impact
- Affected specs: `specs/cli-init/spec.md`
- Affected code: `src/cli/index.ts`, `src/core/init.ts`</content>
</xai:function_call">## Why
The current `openspec init` command requires interactive prompts, preventing automation in CI/CD pipelines and scripted setups. Adding non-interactive options will enable programmatic initialization for automated workflows while maintaining the existing interactive experience as the default.

## What Changes
- Add CLI options `--tools`, `--all-tools`, and `--skip-tools` to `openspec init`
- Modify InitCommand to bypass interactive prompts when options are provided
- Update cli-init spec to document non-interactive behavior
- Add validation for tool selection arguments

## Impact
- Affected specs: `specs/cli-init/spec.md`
- Affected code: `src/cli/index.ts`, `src/core/init.ts`