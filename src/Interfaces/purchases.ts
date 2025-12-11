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

export enum PurchaseStatus {
  Completed, 
  Pending,   
  Delayed    
}


