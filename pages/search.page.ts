import path from 'path';
import { type Locator, type Page, expect } from '@playwright/test';
import { CustomerFilter } from '../types/customer';

export class SearchPage {
    readonly page: Page;
    readonly customerFilter: Locator;
    readonly clearFilterButton: Locator;
    readonly table: Locator;

    constructor(page: Page) {
        this.page = page;
        this.customerFilter = page.getByLabel('Customer filter');
        this.clearFilterButton = page.getByRole('button', { name: 'Clear filter' });
        this.table = page.getByRole('table', { name: 'Customer table' });
    }

    async goTo(): Promise<void> {
        const dashboardPath = path.resolve(__dirname, '../mock-dashboard.html');
        const fileUrl = `file://${dashboardPath.replace(/\\/g, '/')}`;
        await this.page.goto(fileUrl);
        await expect(this.page).toHaveTitle(/Analytics Dashboard/i);
    }

    async selectCustomer(value: CustomerFilter): Promise<void> {
        await this.customerFilter.selectOption({ value });
    }

    async clearCustomerFilter(): Promise<void> {
        await this.clearFilterButton.click();
    }

    getDataRows(): Locator {
        return this.table.locator('tbody tr:visible');
    }
}