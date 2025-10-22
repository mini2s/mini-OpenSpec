# 需求规格说明书 - RooCode 插件支持

## 1. 项目概述

### 1.1 背景

OpenSpec 是一个 CLI 工具，支持多种 AI 编程助手的配置。目前项目已支持 Cline（VS Code 扩展），现在需要添加对 RooCode 插件的支持。RooCode 是基于 Cline fork 开发的 AI 编程助手，具有相似的功能但可能有特定的配置需求和文件结构。

### 1.2 目标

为 OpenSpec 添加 RooCode 插件支持，使开发者能够使用 RooCode 的 AI 编程能力进行规范驱动的开发工作流。

### 1.3 范围

**包含内容**：
- RooCode 工具配置器实现
- RooCode 斜杠命令支持（proposal、apply、archive）
- RooCode 根配置文件生成
- 工具注册表集成

**不包含内容**：
- RooCode 本身的功能实现
- 非 OpenSpec 相关的 RooCode 配置

## 2. 功能需求

### 2.1 用户角色

| 角色名称 | 描述 | 权限 |
|----------|------|------|
| 开发者 | 使用 OpenSpec 和 RooCode 进行项目开发 | 配置工具、执行命令 |

### 2.2 功能清单

#### 2.2.1 RooCode 工具配置器

- **需求ID**: FR-001
- **需求描述**: 实现 RooCode 工具配置器，负责创建和管理 RooCode 的根配置文件
- **优先级**: 高
- **验收标准**: 
  1. 创建 `ROOCODE.md` 根配置文件
  2. 文件包含 OpenSpec 工作流指令
  3. 使用 OpenSpec 标记进行内容管理
  4. 参考 `@/openspec/AGENTS.md` 获取工作流指令
- **依赖关系**: 无

#### 2.2.2 RooCode 斜杠命令配置器

- **需求ID**: FR-002
- **需求描述**: 实现 RooCode 斜杠命令配置器，支持 proposal、apply、archive 三个核心命令
- **优先级**: 高
- **验收标准**:
  1. 创建 `.roocoderules/openspec-proposal.md` 文件
  2. 创建 `.roocoderules/openspec-apply.md` 文件
  3. 创建 `.roocoderules/openspec-archive.md` 文件
  4. 每个命令包含适当的 Markdown 标题前置内容
  5. 遵循已建立的斜杠命令模板模式
- **依赖关系**: FR-001

#### 2.2.3 工具注册表集成

- **需求ID**: FR-003
- **需求描述**: 将 RooCode 注册到 OpenSpec 的工具和斜杠命令注册表中
- **优先级**: 高
- **验收标准**:
  1. 在 `ToolRegistry` 中注册 RooCode 配置器
  2. 在 `SlashCommandRegistry` 中注册 RooCode 斜杠命令配置器
  3. 在 `AI_TOOLS` 配置中添加 RooCode 选项
  4. 确保 RooCode 在初始化过程中可用
- **依赖关系**: FR-001, FR-002

#### 2.2.4 初始化集成

- **需求ID**: FR-004
- **需求描述**: 在 OpenSpec 初始化过程中支持 RooCode 工具选择
- **优先级**: 中
- **验收标准**:
  1. 用户可以通过 `openspec init --tools roocode` 选择 RooCode
  2. 在交互式初始化向导中显示 RooCode 选项
  3. 正确处理 RooCode 的配置和文件生成
- **依赖关系**: FR-003

## 3. 用户故事

### 3.1 初始化项目支持 RooCode

**作为** 开发者
**我想要** 在 OpenSpec 项目初始化时选择 RooCode 作为 AI 助手
**以便于** 使用 RooCode 进行规范驱动的开发工作流

**验收条件**:
* 当我运行 `openspec init --tools roocode` 时，系统创建 RooCode 特定的规则文件
* 并且在项目根目录创建 ROOCODE.md 文件，包含 OpenSpec 工作流指令
* 并且 RooCode 被注册为可用的配置器

### 3.2 使用 RooCode 斜杠命令

**作为** 开发者
**我想要** 使用 RooCode 的斜杠命令来执行 OpenSpec 工作流
**以便于** 在 RooCode 环境中无缝使用 OpenSpec 功能

**验收条件**:
* 当 RooCode 规则配置完成后，`.roocoderules/openspec-proposal.md` 包含提案工作流和防护栏
* 并且 `.roocoderules/openspec-apply.md` 包含实现工作流
* 并且 `.roocoderules/openspec-archive.md` 包含归档工作流
* 并且所有命令包含适当的标题和引用

## 4. 数据需求

### 4.1 数据实体

- **RooCode 配置器**: 负责管理 RooCode 根配置文件
- **RooCode 斜杠命令配置器**: 负责管理 RooCode 斜杠命令文件
- **工具注册表**: 存储和管理所有可用工具配置器

### 4.2 数据流

1. 用户运行 `openspec init` 并选择 RooCode
2. 系统创建 `.roocoderules/` 目录
3. 系统生成三个斜杠命令文件（proposal、apply、archive）
4. 系统在项目根目录创建 `ROOCODE.md` 文件
5. 系统将 RooCode 注册到工具注册表中

## 5. 假设和依赖

### 5.1 假设

- RooCode 使用与 Cline 相似的配置文件结构和规则目录
- RooCode 支持 `.roocoderules/` 目录用于存储特定规则
- RooCode 支持 Markdown 格式的配置文件

### 5.2 依赖

- OpenSpec 核心框架和配置系统
- 现有的工具配置器基类和斜杠命令配置器基类
- 文件系统工具和模板管理器