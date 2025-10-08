import path from "path";
import { SlashCommandConfigurator } from "./base.js";
import { SlashCommandId, TemplateManager } from "../../templates/index.js";
import { FileSystemUtils } from "../../../utils/file-system.js";
import { OPENSPEC_MARKERS } from "../../config.js";

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: ".codex/prompts/openspec-proposal.md",
  apply: ".codex/prompts/openspec-apply.md",
  archive: ".codex/prompts/openspec-archive.md",
};

export class CodexSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = "codex";
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    // Codex does not use YAML front matter. Provide a heading-style
    // preface that captures the first numbered placeholder `$1`.
    const headers: Record<SlashCommandId, string> = {
      proposal: "Request: $1",
      apply: "Change ID: $1",
      archive: "Change ID: $1",
    };
    return headers[id];
  }

  // Override to ensure prompt directory exists and wrap shared body with markers.
  async generateAll(projectPath: string, _openspecDir: string): Promise<string[]> {
    const createdOrUpdated: string[] = [];
    for (const target of this.getTargets()) {
      const body = TemplateManager.getSlashCommandBody(target.id).trim();
      const filePath = path.join(projectPath, target.path);

      await FileSystemUtils.createDirectory(path.dirname(filePath));

      if (await FileSystemUtils.fileExists(filePath)) {
        await this.updateBody(filePath, body);
      } else {
        const header = this.getFrontmatter(target.id);
        const sections: string[] = [];
        if (header) sections.push(header.trim());
        sections.push(`${OPENSPEC_MARKERS.start}\n${body}\n${OPENSPEC_MARKERS.end}`);
        await FileSystemUtils.writeFile(filePath, sections.join("\n") + "\n");
      }

      createdOrUpdated.push(target.path);
    }
    return createdOrUpdated;
  }

  async updateExisting(projectPath: string, _openspecDir: string): Promise<string[]> {
    const updated: string[] = [];
    for (const target of this.getTargets()) {
      const filePath = path.join(projectPath, target.path);
      if (await FileSystemUtils.fileExists(filePath)) {
        const body = TemplateManager.getSlashCommandBody(target.id).trim();
        await this.updateBody(filePath, body);
        updated.push(target.path);
      }
    }
    return updated;
  }
}

