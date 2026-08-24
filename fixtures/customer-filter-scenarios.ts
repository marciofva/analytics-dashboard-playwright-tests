import type { WarehouseRecordStatus } from '../types/warehouse';
import { CustomerFilter } from '../types/customer';

export type CustomerRecordFixture = {
  order: string;
  customer: string;
  warehouse: string;
  status: WarehouseRecordStatus;
};

export const acmeCustomerRecords: CustomerRecordFixture[] = [
  {
    order: 'ORD-1001',
    customer: 'Acme Corp',
    warehouse: 'WH-01',
    status: 'CREATED',
  },
  {
    order: 'ORD-1002',
    customer: 'Acme Corp',
    warehouse: 'WH-02',
    status: 'IN_PROGRESS',
  },
];

export const globexCustomerRecords: CustomerRecordFixture[] = [
  {
    order: 'ORD-2001',
    customer: 'Globex',
    warehouse: 'WH-03',
    status: 'COMPLETED',
  },
];

export const initechCustomerRecords: CustomerRecordFixture[] = [
  {
    order: 'ORD-3001',
    customer: 'Initech',
    warehouse: 'WH-04',
    status: 'FAILED',
  },
];

export const customerFilterScenarios = [
  { filter: CustomerFilter.ACME, records: acmeCustomerRecords },
  { filter: CustomerFilter.GLOBEX, records: globexCustomerRecords },
  { filter: CustomerFilter.INITECH, records: initechCustomerRecords },
];