export type WarehouseRecordStatus =
  | 'CREATED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'FAILED';

export type WarehouseRecord = {
  id: string;
  locationId: string;
  itemSku: string;
  quantity: number;
  status: WarehouseRecordStatus;
};
