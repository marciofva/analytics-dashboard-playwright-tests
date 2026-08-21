import type { WarehouseRecordStatus } from '../types/warehouse';

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
