# Customer Journey Map: 家庭学习习惯云宠物

状态：Draft  
日期：2026-06-21  
Journey type：Cyclical  

## Executive Summary

这个旅程围绕家长和孩子每天循环使用网页产品建立学习习惯。最大的痛点是家长不想增加管理负担，孩子不想被监督或责备。最重要的 Moment of Truth 是孩子第一次完成任务后，宠物是否给出足够即时、温和、可爱的变化，让她愿意第二天再回来。

## Persona / Segment

主要用户是“小小探险家”（孩子），她通过任务打卡和宠物互动获得正反馈；次要用户是“爸爸妈妈”（家长），负责设置任务、确认关键完成、查看趋势和管理隐私。

## Journey Scope

- **Included:** 首次进入、家长设置、孩子每日打卡、宠物反馈、家长确认、次日回访。
- **Excluded:** 学科内容教学、班级协作、老师端、公开社交、正式付费体系。

## Stages

| # | Stage | Customer goal | Duration | Entry trigger | Exit criterion |
| --- | --- | --- | --- | --- | --- |
| 1 | Discovers | 家长确认这个产品是否适合孩子 | 5-10 分钟 | 看到产品介绍或朋友推荐 | 家长愿意创建家庭空间 |
| 2 | Sets Up | 家长创建孩子和初始任务 | 2-5 分钟 | 首次进入产品 | 至少 3 个默认任务可用 |
| 3 | Child Tries | 孩子认识宠物并完成第一个任务 | 3-10 分钟 | 家长邀请孩子打开 | 第一个任务完成并看到宠物反馈 |
| 4 | Daily Loop | 孩子每天完成 1-3 个小任务 | 每天 5-20 分钟 | 放学后/睡前 | 当天获得成长能量和日记 |
| 5 | Parent Reviews | 家长确认和看趋势 | 每天 1-2 分钟 | 孩子提交确认或家长晚上查看 | 完成确认/调整明日任务 |
| 6 | Weekly Reflection | 家庭复盘是否有效 | 每周 5-10 分钟 | 周末或连续 7 天后 | 决定保留、调整或停用任务 |

## Touchpoints

| Stage | Touchpoint | Channel | What happens |
| --- | --- | --- | --- |
| Discovers | 产品介绍页 | Web | 家长看到定位、隐私、安全和试用方式 |
| Sets Up | 家长 onboarding | Web | 选择孩子昵称、宠物名、默认任务 |
| Child Tries | 宠物房间 | Web mobile | 孩子看到宠物、今日任务和轻互动 |
| Daily Loop | 今日任务卡 | Web mobile | 孩子完成、打卡、获得成长能量 |
| Daily Loop | 宠物反馈 | Web mobile | 宠物状态变化、解锁房间物品 |
| Parent Reviews | 家长中心 | Web | 家长确认、调整任务、查看趋势 |
| Weekly Reflection | 周报/宠物日记 | Web | 家庭看到本周进步和下周建议 |

## Emotional Curve

| Stage | Dominant emotion | Confidence | Source |
| --- | --- | --- | --- |
| Discovers | 谨慎期待 | Low | Hypothesis based on parent need |
| Sets Up | 希望省事、担心麻烦 | Low | Hypothesis |
| Child Tries | 好奇、试探 | Low | Hypothesis |
| Daily Loop | 被看见、轻微成就感 | Medium | Competitor patterns from Finch/Khan Kids/ClassDojo |
| Parent Reviews | 轻松或负担感 | Low | Hypothesis; needs timed test |
| Weekly Reflection | 稳定感或放弃判断 | Low | Hypothesis |

## Pain Points and Moments of Truth

| Stage | Pain / Moment of Truth | Severity | Evidence | Implication |
| --- | --- | --- | --- | --- |
| Sets Up | 配置超过 5 分钟会放弃 | 4 | Assumption | 必须有默认任务和一键开始 |
| Child Tries | 第一次完成后反馈不够可爱 | Moment of Truth 5 | Finch/Khan reward loops | 必须优先做宠物反馈和解锁 |
| Daily Loop | 任务太多导致压力 | 5 | Product principle | 默认每日 3 个以内 |
| Parent Reviews | 确认太频繁导致家长弃用 | 4 | Assumption | 只有高价值任务需确认 |
| Weekly Reflection | 看不到真实进步 | 3 | Assumption | 周报要展示稳定性而非分数攀比 |

## Opportunities

| Stage | Opportunity | Product change | Effort |
| --- | --- | --- | --- |
| Sets Up | 降低启动门槛 | 默认任务包 + 2 步 onboarding | Small |
| Child Tries | 建立第一印象 | 宠物迎新动画 + 首次打卡解锁 | Medium |
| Daily Loop | 保持正向循环 | 成长能量、宠物心情、房间解锁 | Medium |
| Parent Reviews | 降低家长成本 | 待确认聚合、趋势摘要、建议调整 | Medium |
| Weekly Reflection | 支持家庭沟通 | 宠物周记 + 下周 1 个小建议 | Medium |

## Visual

```mermaid
flowchart LR
    A["家长发现"] --> B["2 步设置"]
    B --> C["孩子认识宠物"]
    C --> D["每日任务打卡"]
    D --> E["宠物反馈与成长"]
    E --> F["家长轻确认"]
    F --> G["周末复盘"]
    G --> D
```

## Research Gaps

- 需要真实孩子完成首个任务的观察记录。
- 需要家长端设置耗时和确认耗时数据。
- 需要宠物视觉偏好测试。
- 需要验证连续 7 天后是否仍愿意打开。
