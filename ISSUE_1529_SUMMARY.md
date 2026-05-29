# Issue #1529 Summary - Improve GitHub Auth Failure Feedback

## Branch
- feat/1529-auth-error-feedback

## Problem
When GitHub authentication failed, users were redirected back to sign-in without a clear explanation of what happened and what to do next.

## What was implemented
1. Added a dedicated auth error utility for clearer and reusable messaging:
   - `src/lib/auth-error-message.ts`
   - Normalizes/decodes query-string error values safely.
   - Maps common NextAuth error codes to human-friendly GitHub-focused messages.

2. Improved sign-in page error UX:
   - `src/app/auth/signin/page.tsx`
   - Uses normalized error state so the banner remains visible reliably.
   - Keeps existing inline alert pattern, but now provides clearer guidance and a concrete next step.
   - Continues removing stale `?error=` from URL after capture to avoid repeated stale alerts on refresh.

3. Added unit tests for error handling logic:
   - `test/auth-error-message.test.ts`
   - Covers normalization + mapping behavior including fallback paths.

## Validation
- Project setup/readme reviewed.
- Local app run verified:
  - `npm run dev` started successfully at `http://localhost:3000`.
- Focused tests passed:
  - `npm run test -- auth-error-message.test.ts`
  - Result: 1 file passed, 5 tests passed.

## Notes
- `jsdom` was added to `devDependencies` because Vitest prompted for it while running the new tests.
- A full type-check currently reports pre-existing errors in `src/app/layout.tsx` (`Syne`/`JetBrains_Mono` symbols), unrelated to this issue.

## Outcome
Users now see a clear inline explanation when GitHub authentication fails, plus practical guidance for fixing local OAuth setup issues.

---

## PR Title
feat(auth): improve GitHub sign-in failure feedback with clear inline guidance (fixes #1529)

## PR Description

### Linked Issue
Fixes #1529

### Problem
When GitHub authentication failed, users were redirected to the sign-in page without a clear explanation.
This made local setup and OAuth troubleshooting confusing.

### What I changed
- Added a dedicated auth error utility to normalize and map auth error codes to user-friendly messages.
- Improved the sign-in page error banner content for GitHub auth failures.
- Added practical next-step guidance in the UI (OAuth credentials and callback URL checks).
- Preserved stale-error cleanup in the URL while keeping banner display behavior reliable.
- Added focused unit tests for auth error normalization and fallback mapping.
- Added a contributor summary file for issue tracking and review context.

### Files changed
- `src/lib/auth-error-message.ts`
- `src/app/auth/signin/page.tsx`
- `test/auth-error-message.test.ts`
- `ISSUE_1529_SUMMARY.md`

### Validation
- Ran app locally with development server.
- Ran focused tests for new logic:
   - `npm run test -- auth-error-message.test.ts`
- Test coverage added for:
   - empty and malformed auth error input
   - URL-decoded error handling
   - known and unknown error-code mapping

### Impact
- Better user experience during GitHub auth failures.
- Faster troubleshooting for contributors during local OAuth setup.
- Clearer and actionable feedback instead of silent redirect confusion.

### Notes
- `jsdom` was added to devDependencies to support test environment requirements during Vitest execution.
