# Release Readiness: 星星云宠物网页版 MVP

日期：2026-06-21  
状态：v0.3 儿童首页已通过本地 QA 与生产 URL smoke

生产体验地址：`https://adamx6688-cmd.github.io/daughter-cloud-pet-web/`

## Scope

本次发布包含 v0.3 儿童首页体验：

- 首次打开选择宠物并给宠物取名。
- 首页宠物房间。
- 可用能量钱包。
- 喂养、清洁、装扮商店。
- 任务开始、目标用时、实际完成用时与即时能量反馈。
- 基于累计能量和活跃天数的升级机制。
- 活动日志与轻量家长工具。
- 本地优先存储。

不包含：

- 微信小程序。
- 完整家长管理后台。
- 云同步。
- 自由 AI 聊天。
- 班级、排行榜、抽奖。

## Evidence

| Check | Result |
| --- | --- |
| `npm run preflight` | Pass |
| `npm test` | Pass: 1 file, 9 tests |
| `npm run build` | Pass: Vite build, JS gzip 59.67 kB |
| `npm run test:e2e` | Pass: 16 tests, desktop + mobile |
| `npm run qa` | Pass |
| `npm audit --audit-level=moderate` | Pass: 0 vulnerabilities |
| GitHub Pages HEAD | Pass: HTTP 200 |
| Production desktop + mobile smoke | Pass: 16 tests, desktop + mobile |

## E2E Coverage

- 首次打开时选择宠物并命名。
- 任务开始、填写实际用时、完成后获得即时反馈。
- 使用能量喂养和清洁宠物。
- 底部家长工具导出和重新开始。
- axe 扫描首次进入和宠物首页。
- 键盘可达首次进入流程。
- 桌面和移动端截图无横向溢出。

## Visual Evidence

本地截图产物：

- `test-results/artifacts/visual-visual-smoke-visual-9357d-without-horizontal-overflow-chromium/cloud-pet-desktop.png`
- `test-results/artifacts/visual-visual-smoke-visual-9357d-without-horizontal-overflow-chromium/cloud-pet-mobile.png`

## Go/No-Go

当前 Go/No-Go：Go for family trial.

已完成：

- 部署到 GitHub Pages。
- 对生产 URL 跑桌面与移动 Playwright smoke、a11y、视觉冒烟。

## Rollback

当前是静态网页发布。若生产链接异常：

1. 在部署平台回滚到上一版 deploy。
2. 本地保留 `dist/` 可重新部署。
3. 重新运行 `npm run qa` 后再发布。
