# RooCode 插件支持实现任务清单

## 任务规划

- [x] 1. 实现【RooCode 工具配置器】功能子需求
  - 创建 RooCodeConfigurator 类，继承 ToolConfigurator 接口
  - 实现 configure 方法，生成 ROOCODE.md 根配置文件
  - 集成 OpenSpec 工作流指令和标记管理
  - 参考 @/openspec/AGENTS.md 获取工作流指令内容
  - 确保生成的配置文件符合 RooCode 规范
  - _需求：[FR-001]_

- [x] 2. 实现【RooCode 斜杠命令配置器】功能子需求
  - 创建 RooCodeSlashCommandConfigurator 类，继承 SlashCommandConfigurator 基类
  - 实现 generateAll 方法，生成三个斜杠命令文件
  - 创建 .roocoderules/openspec-proposal.md 文件，包含提案工作流
  - 创建 .roocoderules/openspec-apply.md 文件，包含实现工作流
  - 创建 .roocoderules/openspec-archive.md 文件，包含归档工作流
  - 确保每个命令包含适当的 Markdown 标题前置内容
  - 遵循已建立的斜杠命令模板模式
  - _需求：[FR-002]_

- [x] 3. 实现【工具注册表集成】功能子需求
  - 在 src/core/config.ts 的 AI_TOOLS 配置中添加 RooCode 选项
  - 在 src/core/configurators/registry.ts 中注册 RooCodeConfigurator
  - 在 src/core/configurators/slash/registry.ts 中注册 RooCodeSlashCommandConfigurator
  - 确保 RooCode 在初始化过程中可用
  - 验证注册机制的正确性和完整性
  - _需求：[FR-003]_

- [x] 4. 实现【初始化集成】功能子需求
  - 修改初始化流程，支持 RooCode 工具选择
  - 实现 openspec init --tools roocode 命令支持
  - 在交互式初始化向导中添加 RooCode 选项
  - 确保正确处理 RooCode 的配置和文件生成
  - 测试初始化流程的完整性和正确性
  - _需求：[FR-004]_