# Analytics Dashboard Tests

Playwright and TypeScript tests for the local analytics dashboard mock.

## Install

```bash
npm install
npx playwright install chromium firefox
```

The tests open `mock-dashboard.html` directly. No application server is required.

## Run Tests

Chrome/Chromium:

```bash
npx playwright test --project=chromium
```

Firefox:

```bash
npx playwright test --project=firefox
```

Both browsers:

```bash
npx playwright test --project=chromium --project=firefox
```

Regression tests via tags:

```bash
npx playwright test --grep "@regression"
```

## Code Review Skill

Use `.claude/skills/playwright-code-review/SKILL.md` in GitHub Copilot Chat:

```text
Use the playwright-code-review skill to review tests/search.spec.ts.
Apply justified fixes, provide the complete updated file, and run the tests in Chromium and Firefox.
```
