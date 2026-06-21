# QA and Release Gates

状态：Draft  
日期：2026-06-21  

## QA Risk Matrix

| Risk | Impact | Probability | Score | Zone | Required Coverage |
| --- | ---: | ---: | ---: | --- | --- |
| Child-facing copy creates pressure or guilt | 5 | 3 | 15 | Critical | Unit safety tests + manual copy review + child observation |
| Task completion grants duplicate energy | 4 | 3 | 12 | High | Unit + E2E |
| Parent cannot export/delete data | 5 | 2 | 10 | High | E2E + manual |
| Mobile layout overlaps on child screen | 4 | 3 | 12 | High | Visual regression + mobile QA |
| Local storage failure loses data silently | 4 | 2 | 8 | Medium | Unit + manual browser setting test |
| Deployment link unstable | 4 | 3 | 12 | High | Stable host required |
| AI text unsafe if enabled | 5 | 4 | 20 | Critical | MVP disables free AI; future red-team required |

## Smoke Test Suite

Must complete in under 5 minutes:

1. Home loads at stable HTTPS URL.
2. First-run setup creates usable default profile.
3. Child completes one task and pet state updates.
4. Parent approves one pending task.
5. Parent exports data.
6. Parent deletes data and app resets.
7. Mobile viewport screenshot has no overlapping primary UI.
8. Accessibility scan has no serious/critical violations.

## Go / No-Go Checklist

### Must Pass

- [ ] `npm test` or equivalent unit suite green.
- [ ] E2E smoke suite green on deployed preview.
- [ ] Visual screenshots captured for 375px mobile and desktop.
- [ ] No P0/P1 acceptance criteria open.
- [ ] No serious/critical accessibility violations.
- [ ] No high/critical dependency vulnerabilities unreviewed.
- [ ] Stable HTTPS deployment URL exists.
- [ ] QA report written.

### Manual Product Checks

- [ ] Child first-run flow feels playful and understandable.
- [ ] Parent setup can finish in under 2 minutes.
- [ ] No visible copy uses blame, threats, pet harm, rankings, or public comparison.
- [ ] Privacy page states what is collected and how to delete/export.
- [ ] Product does not request camera, microphone, location, contacts, or school identity.

### No-Go Conditions

- Any child-facing punitive or scary copy remains.
- Deployed URL is temporary tunnel/local-only.
- Parent data deletion/export is missing.
- Task energy can be duplicated by repeated clicks.
- Mobile first viewport has overlapping task/pet/CTA UI.
- QA evidence is absent.

## Rollback / Recovery

For MVP static web deployment, rollback means redeploying the last known good build or disabling the preview link. If optional cloud sync is added later, rollback must include data migration and export validation.

## Next QA Artifacts

- `.agents/qa-project-context.md`
- Playwright smoke tests
- Visual regression baseline
- Accessibility report
- Release readiness report
