# User Stories: 星星云宠物网页版 MVP

状态：Draft  
日期：2026-06-21  

## US-001: Fast Parent Setup

**As a** parent,  
**I want** to create a child profile, pet, and default tasks quickly,  
**so that** we can start without turning setup into another chore.

| Field | Value |
| --- | --- |
| Priority | P0 |
| Epic | Onboarding |
| Estimate | M |

### Acceptance Criteria

- Given a first-time parent, when they open the product, then they can start with default settings without typing more than nickname and pet name.
- Given setup is complete, when the parent continues, then the child-facing pet room opens.
- Given the parent skips customization, when the app initializes, then default learning tasks are created.

## US-002: Today Task Board

**As a** child,  
**I want** to see today's small tasks,  
**so that** I know exactly what to do next.

| Field | Value |
| --- | --- |
| Priority | P0 |
| Epic | Daily Habit Loop |
| Estimate | M |

### Acceptance Criteria

- Given active tasks exist, when the child opens the product, then today's tasks are visible below the pet.
- Given a task has metadata, when it is rendered, then title, category, duration, and energy are visible.
- Given there are more than 3 tasks, when the task board loads, then the UI highlights the recommended first 1-3 tasks.

## US-003: Task Completion and Pet Feedback

**As a** child,  
**I want** my pet to respond when I complete a task,  
**so that** I feel my effort was noticed.

| Field | Value |
| --- | --- |
| Priority | P0 |
| Epic | Pet Growth |
| Estimate | L |

### Acceptance Criteria

- Given a no-approval task is open, when the child completes it, then energy is granted once and the pet state updates.
- Given a task requires parent approval, when the child submits it, then the task becomes pending and the pet uses a warm waiting message.
- Given no task is completed, when the child views the pet, then the pet encourages starting with one easy task.

## US-004: Parent Confirmation

**As a** parent,  
**I want** to confirm or undo important tasks,  
**so that** rewards remain trustworthy without constant monitoring.

| Field | Value |
| --- | --- |
| Priority | P0 |
| Epic | Parent Center |
| Estimate | M |

### Acceptance Criteria

- Given pending tasks exist, when the parent opens Parent Center, then all pending tasks are visible in one list.
- Given the parent approves a task, when approval succeeds, then the task grants energy once.
- Given the parent undoes a task, when undo succeeds, then status and energy ledger are corrected.

## US-005: Privacy Control

**As a** parent,  
**I want** to export and delete my child's product data,  
**so that** I remain in control of personal information.

| Field | Value |
| --- | --- |
| Priority | P0 |
| Epic | Privacy and Safety |
| Estimate | M |

### Acceptance Criteria

- Given stored data exists, when the parent exports, then a JSON file or copyable JSON is produced.
- Given the parent confirms deletion, when delete completes, then local child/pet/task records reset.
- Given the parent opens Privacy, when reading it, then collected and non-collected data are clear.

## US-006: Pet Diary

**As a** child,  
**I want** to read a gentle pet diary,  
**so that** I can remember progress without feeling judged.

| Field | Value |
| --- | --- |
| Priority | P1 |
| Epic | Reflection |
| Estimate | M |

### Acceptance Criteria

- Given at least one task was completed, when the diary is generated, then it mentions completed effort in a warm tone.
- Given no task was completed, when the diary is generated, then it suggests a small next step without blame.
- Given the diary is visible, when the parent opens logs, then generated entries are auditable.

## US-007: Weekly Review

**As a** parent,  
**I want** a weekly progress summary,  
**so that** I can adjust tasks based on patterns instead of daily emotion.

| Field | Value |
| --- | --- |
| Priority | P1 |
| Epic | Parent Insight |
| Estimate | M |

### Acceptance Criteria

- Given 7 days of data exist, when the parent opens weekly review, then completed days, total energy, and task consistency are visible.
- Given a task is rarely completed, when weekly review renders, then it suggests reducing scope rather than blaming the child.
- Given no data exists, when weekly review renders, then it shows an empty state and next step.
