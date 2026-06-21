# 星星云宠物网页版

一个为小学生家庭私用设计的本地优先网页应用：孩子通过阅读、作业、整理、复盘等学习习惯获得“成长能量”，和专属云宠物一起成长。

## 当前交付路线

- 主交付：React + Vite 网页应用。
- 数据：默认保存在当前浏览器 `localStorage`。
- 部署：Netlify/Vercel/Cloudflare Pages 均可，当前仓库已配置 Netlify。
- 旧目录：`miniprogram/` 和 `cloudfunctions/` 只保留为早期探索记录，不参与当前主线。

## 产品原则

- 不做班级、老师、多学生、排行榜或抽奖盲盒。
- 不做宠物死亡、生病、扣血、恐吓或羞辱式提醒。
- 第一版用规则引擎和安全模板生成鼓励语，不开放自由 AI 聊天。
- 家长可以添加任务、确认完成、导出数据、删除本机数据。
- 默认最小化儿童信息：只保存昵称、任务、打卡、宠物状态和模板文案日志。

## 工程结构

```text
src/
  App.tsx                  # 网页产品主界面
  components/
    PetIllustration.tsx    # SVG 宠物与房间资产
  lib/
    domain.ts              # 核心规则引擎
    storage.ts             # 浏览器本地存储适配
e2e/
  app.spec.ts              # 核心用户流程
  a11y.spec.ts             # axe 与键盘可访问性
  visual.spec.ts           # 响应式截图与溢出检查
tests/
  domain.test.ts           # 规则单元测试
  preflight.js             # 发布前预检
docs/product/              # 调研、PRD、用户故事、验收标准
docs/design/               # 网页设计说明
docs/qa/                   # QA 与发布证据
netlify.toml               # 稳定 HTTPS 部署配置
```

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址是 Vite 输出的本机地址，常见为 `http://localhost:5173/`。

## 在线体验

公开 HTTPS 地址：

https://adamx6688-cmd.github.io/daughter-cloud-pet-web/

## 验证

```bash
npm run preflight
npm test
npm run build
npm run test:e2e
npm run qa
```

当前 QA 门禁覆盖：

- 8 个规则单测。
- 12 个 Playwright 桌面/移动端 E2E、a11y、视觉冒烟。
- `npm audit --audit-level=moderate` 为 0 漏洞。

## 部署

仓库已包含 `netlify.toml`：

```bash
npx netlify status
npx netlify deploy --prod
```

如果没有 Netlify 登录态，CLI 会要求登录或设置 `NETLIFY_AUTH_TOKEN`。部署产物目录是 `dist/`。

当前也已通过 GitHub Pages 发布，发布分支为 `gh-pages`。
