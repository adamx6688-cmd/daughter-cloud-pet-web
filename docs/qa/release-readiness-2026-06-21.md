# Release Readiness: 星星云宠物网页版 MVP

日期：2026-06-21  
状态：已通过本地 QA 与生产 URL smoke  

生产体验地址：`https://adamx6688-cmd.github.io/daughter-cloud-pet-web/`

## Scope

本次发布包含网页 MVP：

- 宠物房间。
- 今日任务。
- 家长中心。
- 任务库。
- 宠物日记。
- 隐私与数据控制。
- 本地优先存储。

不包含：

- 微信小程序。
- 云同步。
- 自由 AI 聊天。
- 班级、排行榜、商城、抽奖。

## Evidence

| Check | Result |
| --- | --- |
| `npm run preflight` | Pass |
| `npm test` | Pass: 1 file, 8 tests |
| `npm run build` | Pass: Vite build, JS gzip 58.00 kB |
| `npm run test:e2e` | Pass: 12 tests, desktop + mobile |
| `npm run qa` | Pass |
| `npm audit --audit-level=moderate` | Pass: 0 vulnerabilities |
| GitHub Pages HEAD | Pass: HTTP 200 |
| Production Chromium smoke | Pass: 6 tests |

## E2E Coverage

- 孩子完成任务，家长确认待审核任务。
- 家长编辑资料、添加任务、生成日记。
- 隐私页导出和重新开始入口。
- axe 扫描关键视图。
- 键盘可达主导航。
- 桌面和移动端截图无横向溢出。

## Visual Evidence

本地截图产物：

- `test-results/artifacts/visual-visual-smoke-visual-9357d-without-horizontal-overflow-chromium/cloud-pet-desktop.png`
- `test-results/artifacts/visual-visual-smoke-visual-9357d-without-horizontal-overflow-chromium/cloud-pet-mobile.png`

## Go/No-Go

当前 Go/No-Go：Go for family trial.

已完成：

- 部署到 GitHub Pages。
- 对生产 URL 跑 Chromium smoke、a11y、视觉冒烟。

## Rollback

当前是静态网页发布。若生产链接异常：

1. 在部署平台回滚到上一版 deploy。
2. 本地保留 `dist/` 可重新部署。
3. 重新运行 `npm run qa` 后再发布。
