export interface Purchase {
  purchaseId: number;
  id: number;
  amount: number;
  date: string; // ISO date string e.g. "2025-12-11"
  stat?: Status;
  purchaseOrders: PurchaseOrder[];
}

export interface PurchaseOrder {
  purchaseItemId: number;
  costPrice: number;
  quantity: number;
  purchaseId: number;
  productId: number;
}

export enum Status {
  Completed,
  Pending,
  Delayed,
}

export interface GetPurchaseOrdersDto {
  productName?: string; // nullable in backend, so optional here
  costPrice: number;
  quantity: number;
}

export interface GetPurchaseDto {
  purchaseId: number;
  supplierName?: string; // nullable in backend, so optional here
  amount: number;
  date: string; // backend sends "2025-12-10" as a string
  stat: number; // if you want to map to enum, replace with Status
  purchaseOrders?: GetPurchaseOrdersDto[];
}
