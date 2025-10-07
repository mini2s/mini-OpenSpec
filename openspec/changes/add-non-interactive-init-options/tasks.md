## 1. CLI Option Registration
- [x] 1.1 Register an `openspec init` command with `--tools`, `--all-tools`, and `--skip-tools` options in the CLI entrypoint with argument validation.
- [x] 1.2 Update command description to mention non-interactive capabilities

## 2. InitCommand Modifications
- [x] 2.1 Modify InitCommand constructor to accept tool selection options
- [x] 2.2 Update getSelectedTools to return pre-selected tools when options provided
- [x] 2.3 Add validation for tool names against AI_TOOLS registry

## 3. Specification Updates
- [x] 3.1 Update openspec/specs/cli-init/spec.md with non-interactive requirements
- [x] 3.2 Add scenarios for --all-tools, --tools, and --skip-tools usage

## 4. Testing
- [x] 4.1 Add unit tests for non-interactive tool selection parsing
- [x] 4.2 Add integration coverage ensuring generated files pass validation
- [x] 4.3 Verify backward compatibility with existing interactive flow</content>
</xai:function_call">## 1. CLI Option Registration
- [x] 1.1 Register an `openspec init` command with `--tools`, `--all-tools`, and `--skip-tools` options in the CLI entrypoint with argument validation.
- [x] 1.2 Update command description to mention non-interactive capabilities

## 2. InitCommand Modifications
- [x] 2.1 Modify InitCommand constructor to accept tool selection options
- [x] 2.2 Update getSelectedTools to return pre-selected tools when options provided
- [x] 2.3 Add validation for tool names against AI_TOOLS registry

## 3. Specification Updates
- [x] 3.1 Update openspec/specs/cli-init/spec.md with non-interactive requirements
- [x] 3.2 Add scenarios for --all-tools, --tools, and --skip-tools usage

## 4. Testing
- [x] 4.1 Add unit tests for non-interactive tool selection parsing
- [x] 4.2 Add integration coverage ensuring generated files pass validation
- [x] 4.3 Verify backward compatibility with existing interactive flow