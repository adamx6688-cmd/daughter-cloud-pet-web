# 网页发布检查清单

状态：MVP Release Gate  
日期：2026-06-21  

## Engineering Readiness

- [x] `npm run preflight` 通过。
- [x] `npm test` 通过。
- [x] `npm run build` 通过。
- [x] `npm audit --audit-level=moderate` 为 0 漏洞。
- [x] 部署配置 `netlify.toml` 指向 `npm run build` 和 `dist/`。

## QA & Testing

- [x] 孩子端完成任务和待家长确认流程通过。
- [x] 家长端资料编辑、任务添加、任务确认流程通过。
- [x] 宠物日记规则文案生成通过。
- [x] 隐私页导出和重置入口可见。
- [x] 桌面和移动端 Playwright 冒烟通过。
- [x] axe WCAG 标签扫描通过。
- [x] 键盘导航可到达主导航。
- [x] 响应式截图无横向溢出。

## Design & UX

- [x] 首屏是可用产品体验，不是营销 landing page。
- [x] 移动端任务卡按钮不挤压文字。
- [x] 宠物、状态、今日任务层级清楚。
- [x] 宠物不使用死亡、生病、扣血、威胁、羞辱状态。

## Legal & Privacy

- [x] 默认本地优先，不请求摄像头、麦克风、通讯录、位置。
- [x] 家长可以导出 JSON。
- [x] 家长可以删除本机数据。
- [x] 不接自由 AI 聊天。

## Deployment

- [x] 生产构建产物已生成到 `dist/`。
- [ ] Netlify/Vercel/Cloudflare Pages 稳定 HTTPS 链接已部署。
- [ ] 部署后生产 URL smoke test 通过。

## Go/No-Go

当前状态：本地 QA 通过，可以进入稳定 HTTPS 部署。  

No-Go 条件：

- 部署无法返回稳定 HTTPS 链接。
- 生产 URL 核心页面无法加载。
- 生产 URL 出现 JS runtime error。
- 生产 URL E2E 或 smoke test 失败。
