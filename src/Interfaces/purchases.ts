export interface Purchases {
  purchaseId: number;
  id: number;
  amount: number;
  date: string; // ISO date string e.g. "2025-12-11"
  stat: number;
  purchaseOrders: PurchaseOrder[];
}

export interface PurchaseOrder {
  purchaseItemId: number;
  costPrice: number;
  quantity: number;
  purchaseId: number;
  productId: number;
}

export enum PurchaseStatus {
  Completed, 
  Pending,   
  Delayed    
}

export interface GetPurchaseOrdersDto {
  productName?: string;   
  costPrice: number;
  quantity: number;
}

export interface GetPurchaseDto {
  purchaseId: number;
  supplierName?: string;  
  amount: number;
  date: string;           
  stat: number;           
  purchaseOrders?: GetPurchaseOrdersDto[];
}
