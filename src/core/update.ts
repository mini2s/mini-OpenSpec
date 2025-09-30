import chalk from 'chalk';
import path from 'path';
import { FileSystemUtils } from '../utils/file-system.js';
import { OPENSPEC_DIR_NAME } from './config.js';
import { ToolRegistry } from './configurators/registry.js';
import { SlashCommandRegistry } from './configurators/slash/registry.js';
import { PALETTE } from './styles/palette.js';
import { agentsTemplate } from './templates/agents-template.js';

export class UpdateCommand {
  async execute(projectPath: string): Promise<void> {
    const resolvedProjectPath = path.resolve(projectPath);
    const openspecDirName = OPENSPEC_DIR_NAME;
    const openspecPath = path.join(resolvedProjectPath, openspecDirName);

    // 1. Check openspec directory exists
    if (!await FileSystemUtils.directoryExists(openspecPath)) {
      throw new Error(`No OpenSpec directory found. Run 'openspec init' first.`);
    }

    // 2. Update AGENTS.md (full replacement)
    const agentsPath = path.join(openspecPath, 'AGENTS.md');

    await FileSystemUtils.writeFile(agentsPath, agentsTemplate);

    // 3. Update existing AI tool configuration files only
    const configurators = ToolRegistry.getAll();
    const slashConfigurators = SlashCommandRegistry.getAll();
    let updatedFiles: string[] = [];
    let failedFiles: string[] = [];
    let updatedSlashFiles: string[] = [];
    let failedSlashTools: string[] = [];
    
    for (const configurator of configurators) {
      const configFilePath = path.join(resolvedProjectPath, configurator.configFileName);
      
      // Only update if the file already exists
      if (await FileSystemUtils.fileExists(configFilePath)) {
        try {
          if (!await FileSystemUtils.canWriteFile(configFilePath)) {
            throw new Error(`Insufficient permissions to modify ${configurator.configFileName}`);
          }
          await configurator.configure(resolvedProjectPath, openspecPath);
          updatedFiles.push(configurator.configFileName);
        } catch (error) {
          failedFiles.push(configurator.configFileName);
          console.error(`Failed to update ${configurator.configFileName}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }

    for (const slashConfigurator of slashConfigurators) {
      if (!slashConfigurator.isAvailable) {
        continue;
      }

      try {
        const updated = await slashConfigurator.updateExisting(resolvedProjectPath, openspecPath);
        updatedSlashFiles = updatedSlashFiles.concat(updated);
      } catch (error) {
        failedSlashTools.push(slashConfigurator.toolId);
        console.error(
          `Failed to update slash commands for ${slashConfigurator.toolId}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    // 4. Success summary (ASCII-safe)
    const formatUpdated = (label: string): string =>
      `${PALETTE.white(label)} ${PALETTE.lightGray('(updated)')}`;
    const formatFailed = (label: string): string =>
      `${PALETTE.white(label)} ${chalk.red('(failed)')}`;

    const bullet = (text: string) => `  ${PALETTE.white('▌')} ${text}`;
    const printSection = (title: string, rows: string[]): void => {
      console.log(PALETTE.lightGray(title));
      for (const row of rows) {
        console.log(bullet(row));
      }
    };

    const sections: Array<{ title: string; rows: string[] }> = [];
    const reportedFailures = new Set<string>();

    const instructionRows: string[] = [formatUpdated('openspec/AGENTS.md')];
    if (updatedFiles.includes('AGENTS.md')) {
      instructionRows.push(formatUpdated('AGENTS.md'));
    }
    if (failedFiles.includes('AGENTS.md')) {
      instructionRows.push(formatFailed('AGENTS.md'));
      reportedFailures.add('AGENTS.md');
    }
    sections.push({ title: 'Instructions', rows: instructionRows });

    const toolRows = updatedFiles
      .filter((file) => file !== 'AGENTS.md')
      .map((file) => formatUpdated(file));
    if (toolRows.length > 0) {
      sections.push({ title: 'AI tools', rows: toolRows });
    }

    const slashRows = updatedSlashFiles.map((file) => formatUpdated(file));
    if (slashRows.length > 0) {
      sections.push({ title: 'Slash commands', rows: slashRows });
    }

    const issueRows: string[] = [];
    if (failedFiles.length > 0) {
      issueRows.push(
        ...failedFiles
          .filter((file) => !reportedFailures.has(file))
          .map((file) => formatFailed(file))
      );
    }
    if (failedSlashTools.length > 0) {
      issueRows.push(
        ...failedSlashTools.map((tool) =>
          formatFailed(`slash command refresh (${tool})`)
        )
      );
    }
    if (issueRows.length > 0) {
      sections.push({ title: 'Issues', rows: issueRows });
    }

    console.log(PALETTE.white('OpenSpec instructions refreshed'));
    console.log(PALETTE.midGray('Latest templates applied to files below.'));
    console.log();

    sections.forEach((section, index) => {
      printSection(section.title, section.rows);
      if (index !== sections.length - 1) {
        console.log();
      }
    });
  }
}
