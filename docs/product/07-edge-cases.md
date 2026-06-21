# Edge Cases: 星星云宠物网页版 MVP

状态：Draft  
日期：2026-06-21  

## Feature Overview

网页 MVP 覆盖家庭设置、今日任务、宠物成长、家长确认、宠物日记、本地数据控制和稳定部署。

## Input Validation

| Scenario | Expected Behavior | Priority | Notes |
| --- | --- | --- | --- |
| Child nickname empty | Use default nickname and allow later edit | P2 | Avoid blocking setup |
| Pet name empty | Use default “星星” | P2 | Child can rename later |
| Task title empty | Disable save and show inline prompt | P1 | No silent invalid tasks |
| Task title > 28 chars | Enforce limit or clean truncation | P1 | Must not overlap cards |
| Energy value <= 0 | Reset to safe default | P1 | Prevent no-op confusion |
| Energy value > per-task max | Cap to configured max | P1 | Prevent reward inflation |
| Estimated minutes invalid | Use default or ask correction | P2 | Not critical to rewards |

## Boundary Conditions

| Scenario | Expected Behavior | Priority | Notes |
| --- | --- | --- | --- |
| 0 tasks today | Calm empty state | P1 | No shame copy |
| 1 task today | Focus mode works | P1 | Ideal child state |
| 5+ tasks today | UI groups/recommends first tasks | P2 | Avoid overwhelm |
| Daily cap reached | No extra energy but task can complete | P1 | Explain gently |
| Stage threshold exact match | New stage unlocks | P1 | e.g. 30, 90, 180 |
| Last day of week | Weekly review includes current day | P2 | Date handling |
| Timezone changes | Use local date and avoid data loss | P2 | Family travel |

## Error States

| Scenario | Expected Behavior | Priority | Notes |
| --- | --- | --- | --- |
| Local storage disabled | Read-only fallback + recovery message | P1 | No false save |
| JSON export fails | Show retry/copy fallback | P2 | Parent control |
| Delete interrupted | Preserve data unless confirmed success | P1 | Avoid accidental loss |
| Static asset missing | Fallback pet visual | P2 | Core usable |
| Route not found | Friendly 404 back to home | P2 | Web deployment |
| Browser too old | Graceful unsupported message | P3 | Low likelihood |

## Concurrency

| Scenario | Expected Behavior | Priority | Notes |
| --- | --- | --- | --- |
| Double tap complete | Single check-in and single energy grant | P1 | Debounce/idempotency |
| Parent approves twice | Single approval and ledger entry | P1 | Idempotency |
| Child completes while parent resets | Reset wins after explicit confirmation | P1 | Data safety |
| Multiple tabs open | Last write warning or simple sync on focus | P2 | Browser local storage |

## Safety Copy Failures

| Scenario | Expected Behavior | Priority | Notes |
| --- | --- | --- | --- |
| Generated text contains blame/threat | Block and replace with safe fallback | P1 | Applies to templates and future AI |
| No tasks completed | Encourage one small next step | P1 | No guilt |
| Long streak broken | Say “restart gently” not “lost streak” | P1 | Avoid pressure |
| Parent creates harsh task title | Product allows title but pet copy does not amplify harshness | P2 | Later add parent guidance |

## Error Messages

| Error State | User Message | Action |
| --- | --- | --- |
| Storage unavailable | “这台设备暂时不能保存进度。请检查浏览器设置后再试。” | Retry |
| Export failed | “导出没有成功，可以再试一次。” | Retry |
| Delete confirm | “删除后会恢复初始状态。确定继续吗？” | Cancel/Delete |
| Asset fallback | “星星正在换装，任务仍然可以完成。” | Continue |
| App error | “页面刚刚走神了，刷新后可以继续。” | Reload |

## Test Scenarios

### Must Test P1

- [ ] 首次 setup 在 2 分钟内完成。
- [ ] 完成任务只发一次能量。
- [ ] 审批任务必须等家长确认。
- [ ] 每日能量上限生效。
- [ ] 删除数据需要确认且能恢复初始状态。
- [ ] P0 页面无压力/责备/伤害类文案。
- [ ] 移动端 375px 下无重叠。

### Should Test P2

- [ ] 任务标题极长时布局稳定。
- [ ] 空任务日有正确空状态。
- [ ] 周报无数据时有下一步。
- [ ] 多标签页基本可恢复。
- [ ] 宠物资产加载失败有 fallback。

### Nice to Test P3

- [ ] 旧浏览器提示。
- [ ] 系统暗色模式表现。
- [ ] PWA 安装提示表现。
