# 云宠物网页项目 Skill 团队编队

## 决策

后续不再由单一开发视角直接写实现。项目改为网页产品路线，按“产品团队流水线”推进；每个阶段必须产出可审查文档或验收证据，再进入下一阶段。

## 已安装 GitHub Skills

### 产品经理与产品策略

来源：`product-on-purpose/pm-skills`

- `foundation-persona`：定义女儿、家长、家庭使用者画像。
- `discover-competitive-analysis`：竞品与参考产品分析。
- `discover-journey-map`：孩子端和家长端用户旅程。
- `define-problem-statement`：问题定义和非目标。
- `define-opportunity-tree`：机会树，避免一上来堆功能。
- `define-prioritization-framework`：MVP 排序和取舍。
- `deliver-prd`：完整 PRD。
- `deliver-user-stories`：用户故事。
- `deliver-acceptance-criteria`：验收标准。
- `deliver-edge-cases`：边界场景。
- `deliver-launch-checklist`：上线检查清单。
- `measure-instrumentation-spec`：埋点和指标设计。
- `measure-experiment-design`：家庭试用实验设计。

### QA 与验收

来源：`petrkindlmann/qa-skills`

- `qa-project-bootstrap`：QA 接管项目和测试架构审计。
- `risk-based-testing`：风险驱动测试矩阵。
- `ai-test-generation`：从 PRD 生成测试用例。
- `mobile-testing`：移动端真机验收。
- `accessibility-testing`：可访问性与可用性检查。
- `playwright-automation`：浏览器自动化验收。
- `visual-testing`：视觉回归和截图验收。
- `release-readiness`：发布 go/no-go。
- `qa-report-humanizer`：把测试结果整理成可读报告。

### 宠物形象与动效

来源：`openai/skills`

- `hatch-pet`：宠物视觉、动画图集、视觉 QA、打包。

### 网页部署与上线

来源：`openai/skills`

- `vercel-deploy`：Vercel 部署和预览环境。
- `cloudflare-deploy`：Cloudflare Pages/Workers 路线。
- `netlify-deploy`：Netlify 部署和分享链接。
- `render-deploy`：Render 部署备选。

## 本机已有配套 Skills

- `figma` / `figma-generate-design` / `figma-implement-design`：设计稿、设计系统、设计还原。
- `playwright` / `playwright-interactive`：真实浏览器验收。
- `wechat-miniprogram-delivery`：当前不作为主线，仅在未来重新切回微信小程序时使用。
- `security-threat-model` / `security-best-practices`：安全审计。
- `babycare-privacy-compliance`、`infant-feeding-safety-gate` 等不适用于本项目，除非项目重新转向育儿医学建议。

## 推荐工作流

1. 产品调研：`foundation-persona`、`discover-competitive-analysis`、`discover-journey-map`。
2. 产品定义：`define-problem-statement`、`define-opportunity-tree`、`define-prioritization-framework`。
3. PRD：`deliver-prd`、`deliver-user-stories`、`deliver-acceptance-criteria`、`deliver-edge-cases`。
4. 设计：Figma 系列 skills 产出网页端信息架构、孩子端、家长端、宠物房间、任务流和隐私流。
5. 宠物资产：`hatch-pet` 生成并 QA 专属宠物形象和动画。
6. 开发：按 PRD 和验收标准实现正式网页产品，不再先做临时体验页。
7. QA：`qa-project-bootstrap`、`risk-based-testing`、`ai-test-generation`、`mobile-testing`、`accessibility-testing`、`visual-testing`。
8. 发布：优先选择 `vercel-deploy` 或 `cloudflare-deploy`，再用 `release-readiness`、`deliver-launch-checklist` 做 go/no-go。
9. 试用复盘：`measure-instrumentation-spec`、`measure-experiment-design`、`qa-report-humanizer`。

## 硬门禁

- 没有 PRD 和验收标准，不进入开发。
- 没有稳定网页预览 URL 或部署链接，不宣称可体验。
- 没有 QA 报告，不宣称完成。
- 不再以微信小程序二维码作为当前主交付目标。
- 不复用“一息一得”或“不坑爹无夜奶”的 AppID。
