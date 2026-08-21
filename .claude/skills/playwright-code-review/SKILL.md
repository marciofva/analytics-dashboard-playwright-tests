---
name: playwright-code-review
description: Perform comprehensive code reviews for Playwright tests written in TypeScript, ensuring adherence to best practices, robust locators, reliable assertions, and high performance. Always provide full, revised, and updated code changes. Use when reviewing Playwright TypeScript test code or pull requests.
argument-hint: feature or leave blank to review all code
---

# Playwright TypeScript Code Review & Refactoring

Perform a thorough, expert-level code review for Playwright test files written in TypeScript. Focus on test reliability, maintainability, performance, and adherence to modern Playwright and TypeScript best practices. **Crucially, you must always provide the fully refactored, updated code block implementing all recommended fixes.**

## Review Checklist

### 1. Robust Locators & Selectors
- **Prefer User-Facing Locators**: Use built-in locators (`getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`, `getByAltText`, `getByTitle`) rather than generic CSS or XPath selectors.
- **Avoid Brittle Selectors**: Flag fragile ID/class combinations or deep DOM hierarchies (e.g., `div > div > span > button`).
- **Use Test IDs when necessary**: Recommend `getByTestId` only when semantic user-facing locators are unavailable.

### 2. Reliable Assertions & Async Operations
- **Enforce Web-First Assertions**: Ensure assertions use Playwright's auto-retrying web-first matchers (`expect(locator).toBeVisible()`, `expect(locator).toHaveText()`, etc.).
- **No Manual Timeouts**: Strictly flag `page.waitForTimeout()` or `setTimeout`. Recommend proper event listeners, network waits, or auto-retrying assertions instead.
- **Proper Async/Await**: Verify all Playwright asynchronous actions (`click`, `fill`, `goto`, assertions) are properly awaited.

### 3. Test Structure & Isolation
- **Test Independence**: Ensure tests do not depend on execution order or share mutable state.
- **Fixtures & Hooks**: Use `test.beforeEach`, `test.afterEach`, and custom Playwright fixtures for setup and teardown rather than global side effects.
- **Page Object Model (POM)**: Verify that complex test suites separate page interactions into well-typed Page Objects with clear method names.

### 4. Network Interception & API Testing
- **Network Waits**: When waiting for network calls, use `page.waitForResponse()`, `page.waitForRequest()`, or `route.fulfill()` instead of arbitrary sleep timers.
- **API Setup/Teardown**: Recommend using `request` fixture for setting up test data or cleaning up via API rather than relying entirely on slow UI interactions.

### 5. TypeScript Best Practices
- **Strict Typing**: Ensure no `any` types unless absolutely necessary. Type custom fixtures, page objects, and test options explicitly.
- **Type Safety**: Verify correct typing for test parameters, locator types, and response payloads.

### 6. Flakiness & Performance
- **Parallelization**: Ensure tests are designed to run safely in parallel (`test.describe.parallel` or worker-level parallelism).
- **Clean Up**: Verify test data cleanup happens reliably (e.g., in `test.afterEach` or via API teardown).


## Mandatory
The test should include:

- clear setup
- clear action steps
- meaningful assertions
- readable naming
- basic failure awareness


## Output Format for Code Reviews

Structure your code review feedback clearly using the following format:

1. **Summary / Overall Assessment**: Brief verdict on code quality, reliability, and maintainability.
2. **Critical Issues / Anti-Patterns**: Highlight anything causing flakiness, hardcoded timeouts, or incorrect async handling.
3. **Best Practice Recommendations**: Suggestions for improving locators, TypeScript typing, and architectural structure (POM/fixtures).
4. **Refactored Code (Mandatory)**: Provide the **complete, updated TypeScript code** incorporating all fixes so the user can directly copy and replace their original code. Never omit code blocks or provide partial snippets when a full rewrite is expected.

## Final verification of test execution

After the improvement, run all tests to ensure they are working correctly. If any scenario fails, fix it until it becomes stable in all available configured browsers at `playwright.config.ts`.
