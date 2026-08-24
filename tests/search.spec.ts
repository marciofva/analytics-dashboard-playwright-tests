import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search.page';
import {
    customerFilterScenarios,
    globexCustomerRecords,
} from '../fixtures/customer-filter-scenarios';
import { CustomerFilter } from '../types/customer';

test.describe('Analytics dashboard customer filter', { tag: '@regression' }, () => {
    test.beforeEach(async ({ page }) => {
        await new SearchPage(page).goTo();
    });

    test('clears a customer filter and restores the default table', async ({ page }) => {
        const searchPage = new SearchPage(page);
        const defaultRows = await searchPage.getDataRows().allTextContents();
        const expectedCustomerName = globexCustomerRecords[0].customer;

        await expect(searchPage.customerFilter).toHaveValue(CustomerFilter.ALL);
        expect(defaultRows.length).toBeGreaterThan(1);

        await searchPage.selectCustomer(CustomerFilter.GLOBEX);

        const filteredRows = searchPage.getDataRows();
        await expect(searchPage.customerFilter).toHaveValue(CustomerFilter.GLOBEX);
        await expect(filteredRows).toHaveCount(1);
        await expect(filteredRows).toContainText(expectedCustomerName);

        await searchPage.clearCustomerFilter();

        await expect(searchPage.customerFilter).toHaveValue(CustomerFilter.ALL);
        await expect(searchPage.getDataRows()).toHaveCount(defaultRows.length);
        await expect(searchPage.getDataRows()).toHaveText(defaultRows);
    });

    test('filters the table for every customer type', async ({ page }) => {
        const searchPage = new SearchPage(page);

        for (const scenario of customerFilterScenarios) {
            await searchPage.selectCustomer(scenario.filter);

            const rows = searchPage.getDataRows();
            await expect(searchPage.customerFilter).toHaveValue(scenario.filter);
            await expect(rows).toHaveCount(scenario.records.length);

            for (const [index, expectedRecord] of scenario.records.entries()) {
                const recordCells = rows.nth(index).locator('td');
                await expect(recordCells).toHaveText([
                    expectedRecord.order,
                    expectedRecord.customer,
                    expectedRecord.warehouse,
                    expectedRecord.status,
                ]);
            }
        }
    });
});
