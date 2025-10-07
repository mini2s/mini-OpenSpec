# Delta for CLI Init Specification

## ADDED Requirements
### Requirement: Non-Interactive Mode
The command SHALL support non-interactive operation through command-line options for automation and CI/CD use cases.

#### Scenario: All tools selection
- **WHEN** run with `--all-tools` option
- **THEN** automatically select all available AI tools without prompting
- **AND** proceed with initialization using the selected tools

#### Scenario: Specific tools selection
- **WHEN** run with `--tools <comma-separated-list>` option
- **THEN** parse the comma-separated tool IDs and validate against available tools
- **AND** proceed with initialization using only the specified valid tools
- **AND** display a warning for any invalid tool IDs

#### Scenario: No tools selection
- **WHEN** run with `--skip-tools` option
- **THEN** skip AI tool configuration entirely
- **AND** only create the OpenSpec directory structure and template files

#### Scenario: Invalid tool specification
- **WHEN** run with `--tools` containing invalid tool IDs
- **THEN** exit with code 1 and display available tool options
- **AND** show error message listing valid tool IDs

## MODIFIED Requirements
### Requirement: Interactive Mode
The command SHALL provide an interactive menu for AI tool selection with clear navigation instructions.

#### Scenario: Displaying interactive menu
- **WHEN** run in fresh or extend mode without non-interactive options
- **THEN** present a looping select menu that lets users toggle tools with Enter and finish via a "Done" option
- **AND** label already configured tools with "(already configured)" while keeping disabled options marked "coming soon"
- **AND** change the prompt copy in extend mode to "Which AI tools would you like to add or refresh?"
- **AND** display inline instructions clarifying that Enter toggles a tool and selecting "Done" confirms the list</content>
</xai:function_call"># Delta for CLI Init Specification

## ADDED Requirements
### Requirement: Non-Interactive Mode
The command SHALL support non-interactive operation through command-line options for automation and CI/CD use cases.

#### Scenario: All tools selection
- **WHEN** run with `--all-tools` option
- **THEN** automatically select all available AI tools without prompting
- **AND** proceed with initialization using the selected tools

#### Scenario: Specific tools selection
- **WHEN** run with `--tools <comma-separated-list>` option
- **THEN** parse the comma-separated tool IDs and validate against available tools
- **AND** proceed with initialization using only the specified valid tools
- **AND** display a warning for any invalid tool IDs

#### Scenario: No tools selection
- **WHEN** run with `--skip-tools` option
- **THEN** skip AI tool configuration entirely
- **AND** only create the OpenSpec directory structure and template files

#### Scenario: Invalid tool specification
- **WHEN** run with `--tools` containing invalid tool IDs
- **THEN** exit with code 1 and display available tool options
- **AND** show error message listing valid tool IDs

## MODIFIED Requirements
### Requirement: Interactive Mode
The command SHALL provide an interactive menu for AI tool selection with clear navigation instructions.

#### Scenario: Displaying interactive menu
- **WHEN** run in fresh or extend mode without non-interactive options
- **THEN** present a looping select menu that lets users toggle tools with Enter and finish via a "Done" option
- **AND** label already configured tools with "(already configured)" while keeping disabled options marked "coming soon"
- **AND** change the prompt copy in extend mode to "Which AI tools would you like to add or refresh?"
- **AND** display inline instructions clarifying that Enter toggles a tool and selecting "Done" confirms the list