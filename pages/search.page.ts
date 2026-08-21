import path from 'path';
import { type Locator, type Page, expect } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly customerFilter: Locator;
    readonly clearFilterButton: Locator;
    readonly table: Locator;

    constructor(page: Page) {
        this.page = page;
        this.customerFilter = page.locator('#customer-filter');
        this.clearFilterButton = page.locator('#clear-filter');
        this.table = page.locator('#analytics-table');
    }

    async goTo() {
        const dashboardPath = path.resolve(__dirname, '../mock-dashboard.html');
        const fileUrl = `file://${dashboardPath.replace(/\\/g, '/')}`;
        await this.page.goto(fileUrl);
        await expect(this.page).toHaveTitle(/Analytics Dashboard/i);
        await expect(this.table).toBeVisible();
        await expect(this.customerFilter).toBeVisible();
    }

    async selectCustomer(value: string) {
        await this.customerFilter.selectOption({ value });
    }

    async clearCustomerFilter() {
        await this.clearFilterButton.click();
    }

    getDataRows() {
        return this.table.locator('tbody tr:not([hidden])');
    }
}