import os from 'os';
import path from 'path';
import { promises as fs } from 'fs';
import { slugifyFactoryCommand } from '../utils/slug.js';

export interface FactorySlashOptions {
  description?: string;
  argumentHint?: string;
  executable?: boolean;
  personal?: boolean;
  force?: boolean;
}

export class FactoryCommand {
  async slash(name: string, options: FactorySlashOptions = {}): Promise<void> {
    const slug = slugifyFactoryCommand(name ?? '');
    if (!slug) {
      throw new Error('Factory command names must use letters, numbers, spaces, dashes, or underscores.');
    }

    const baseDir = options.personal
      ? path.join(os.homedir(), '.factory', 'commands')
      : path.join(process.cwd(), '.factory', 'commands');
    await fs.mkdir(baseDir, { recursive: true });

    const extension = options.executable ? '.sh' : '.md';
    const filePath = path.join(baseDir, `${slug}${extension}`);

    const fileExists = await this.pathExists(filePath);
    if (fileExists && !options.force) {
      throw new Error(`Factory command "/${slug}" already exists at ${filePath}. Use --force to overwrite.`);
    }

    const content = options.executable
      ? this.buildExecutableTemplate(slug)
      : this.buildMarkdownTemplate(options.description, options.argumentHint);

    await fs.writeFile(filePath, content, 'utf8');
    if (options.executable) {
      await fs.chmod(filePath, 0o755);
    }

    const hint = options.argumentHint ? ` ${options.argumentHint}` : '';
    console.log(`Created Factory slash command at ${filePath}`);
    console.log(`Trigger with /${slug}${hint}`.trim());
  }

  private async pathExists(targetPath: string): Promise<boolean> {
    try {
      await fs.access(targetPath);
      return true;
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  }

  private buildMarkdownTemplate(description?: string, argumentHint?: string): string {
    const frontmatter = [
      '---',
      `description: ${description ?? ''}`,
      `argument-hint: ${argumentHint ?? ''}`,
      '---',
      '',
    ];

    const body = [
      'Replace this text with the instructions you want droid to follow.',
      '',
      'Arguments provided when invoking the slash command will appear as `$ARGUMENTS`.',
      '',
      '- Highlight important TODOs for the assistant.',
      '- Document any prerequisites the script should assume.',
      '',
      'Thanks!'
    ];

    return [...frontmatter, ...body, ''].join('\n');
  }

  private buildExecutableTemplate(slug: string): string {
    const lines = [
      '#!/usr/bin/env bash',
      '',
      'set -euo pipefail',
      '',
      'command_name="' + slug + '"',
      'target="$1"',
      '',
      'echo "Running /${command_name} for ${target:-your task}"',
      '',
      '# Add your automation steps here',
      '# npm install',
      '# npm run lint',
      '',
      'echo "Finished /${command_name}"',
      '',
    ];

    return lines.join('\n');
  }
}
