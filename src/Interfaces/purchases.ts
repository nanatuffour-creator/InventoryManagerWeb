<<<<<<< HEAD
=======
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


<<<<<<< HEAD
export interface GetPurchaseDto {
  purchaseId: number;
  supplierName?: string;  
  amount: number;
  date: string;           
  stat: number;           
  purchaseOrders?: GetPurchaseOrdersDto[];
}
>>>>>>> e093b17967726acafb8be3632c8fe772e6822507
=======
>>>>>>> 3e5600d5dbe0c41ae754f73ac8894703207b1d62
