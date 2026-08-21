import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search.page';
import { acmeCustomerRecords } from '../fixtures/acme-customer-records';
import { CustomerFilter } from '../types/customer';

test.describe('Analytics dashboard customer filter', { tag: '@regression' }, () => {
    test.beforeEach(async ({ page }) => {
        await new SearchPage(page).goTo();
    });

    test('clears a customer filter and restores the default table', async ({ page }) => {
        const searchPage = new SearchPage(page);
        const defaultRows = await searchPage.getDataRows().allTextContents();

        await expect(searchPage.customerFilter).toHaveValue(CustomerFilter.ALL);
        expect(defaultRows.length).toBeGreaterThan(1);

        await searchPage.selectCustomer(CustomerFilter.GLOBEX);

        const filteredRows = searchPage.getDataRows();
        await expect(searchPage.customerFilter).toHaveValue(CustomerFilter.GLOBEX);
        await expect(filteredRows).toHaveCount(1);
        await expect(filteredRows).toContainText('Globex');

        await searchPage.clearCustomerFilter();

        await expect(searchPage.customerFilter).toHaveValue(CustomerFilter.ALL);
        await expect(searchPage.getDataRows()).toHaveCount(defaultRows.length);
        await expect(searchPage.getDataRows()).toHaveText(defaultRows);
    });

    test('filters the table for Acme Corp', async ({ page }) => {
        const searchPage = new SearchPage(page);

        await searchPage.selectCustomer(CustomerFilter.ACME);

        const rows = searchPage.getDataRows();
        await expect(rows).toHaveCount(acmeCustomerRecords.length);

        for (const [index, expectedRecord] of acmeCustomerRecords.entries()) {
            const recordRow = rows.nth(index);
            await expect(recordRow).toContainText(expectedRecord.order);
            await expect(recordRow).toContainText(expectedRecord.customer);
            await expect(recordRow).toContainText(expectedRecord.warehouse);
            await expect(recordRow).toContainText(expectedRecord.status);
        }
    });
});
