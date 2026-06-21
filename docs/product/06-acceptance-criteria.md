# Acceptance Criteria: 星星云宠物网页版 MVP

状态：Draft  
日期：2026-06-21  

## Story Context

本验收标准覆盖网页 MVP 的产品级 done-ness。它绑定 `docs/product/04-prd.md` 和 `docs/product/05-user-stories.md`，并作为开发、QA、发布的硬门禁。

## P0 Happy Path

### AC-001: First Run Setup

**Given** a new parent opens the deployed web product  
**When** they complete or skip setup  
**Then** the product creates a usable default child profile, pet profile, and default task set within 2 minutes.

### AC-002: Child Completes a Task

**Given** the child sees today's task board  
**When** the child completes a no-approval task  
**Then** the task status changes to completed, growth energy increases once, and the pet state visibly updates.

### AC-003: Parent Approval Flow

**Given** a task requires parent approval  
**When** the child submits the task  
**Then** the task appears in Parent Center as pending and does not grant energy until approved.

### AC-004: Pet Safety Tone

**Given** any task state including open, completed, pending, undone, or no tasks  
**When** the pet message, diary, or summary is generated  
**Then** the copy contains no blame, threat, death, illness, abandonment, or punishment framing.

### AC-005: Parent Data Control

**Given** the product has stored child/pet/task data  
**When** the parent exports or deletes data  
**Then** export produces complete readable data and delete resets local records after confirmation.

## Edge Cases

### AC-006: Daily Energy Cap

**Given** the child completes enough tasks to exceed the daily cap  
**When** additional tasks are completed  
**Then** the tasks may complete but daily energy does not exceed the configured cap.

### AC-007: Duplicate Completion

**Given** a task is already completed or pending  
**When** the user taps complete again  
**Then** the product does not duplicate check-ins or grant duplicate energy.

### AC-008: Empty Task Day

**Given** no tasks are active for today  
**When** the child opens the product  
**Then** the product shows a calm empty state and a parent action to add tasks.

### AC-009: Long Task Names

**Given** a parent enters a long task title  
**When** the task is saved and rendered on mobile  
**Then** text wraps or truncates cleanly without overlapping UI.

## Error States

### AC-010: Local Storage Unavailable

**Given** browser storage is unavailable or full  
**When** the product attempts to save  
**Then** the user sees a clear recovery message and the product does not falsely claim the save succeeded.

### AC-011: Deployment Asset Failure

**Given** a pet image or animation asset fails to load  
**When** the pet room renders  
**Then** a safe fallback visual appears and core tasks remain usable.

### AC-012: Unexpected App Error

**Given** an unhandled UI error occurs  
**When** the page recovers  
**Then** the user sees a friendly error boundary with reload guidance and no child data is exposed.

## Non-Functional Criteria

### AC-013: Mobile Usability

**Given** a 375px-wide mobile viewport  
**When** the child uses core flows  
**Then** no primary text or buttons overlap, and all tap targets are at least 44px high.

### AC-014: Performance

**Given** the deployed preview runs on a normal mobile network  
**When** the home page loads  
**Then** first meaningful UI appears within 3 seconds on a mid-range phone profile.

### AC-015: Accessibility

**Given** the product is scanned with automated accessibility checks  
**When** P0 pages are tested  
**Then** there are no serious or critical accessibility violations, and keyboard navigation reaches all parent controls.

### AC-016: Privacy

**Given** MVP is local-first  
**When** the product is used without optional cloud sync  
**Then** no child data is sent to third-party services except static asset hosting requests.

### AC-017: Stable Experience URL

**Given** the product is ready for family trial  
**When** the user opens the provided URL  
**Then** it is a stable HTTPS deployment URL from Vercel, Cloudflare, Netlify, or equivalent; localtunnel/ngrok-style temporary links do not satisfy acceptance.

## Release Gate

The MVP is not accepted until:

- All P0 acceptance criteria pass.
- Product runs at a stable HTTPS deployment URL.
- Playwright smoke tests cover setup, task completion, parent confirmation, data export/delete, and no-overlap mobile layout.
- Visual screenshots are captured for mobile and desktop.
- QA report is written and linked from release notes.
