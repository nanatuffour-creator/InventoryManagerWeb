export interface InvoiceItemDto {
  invoiceItemId: number;
  productId: number;
  invoiceId: number;
  sellingPrice: number;
  quantity: number;
  productName: string;
  productPrice: number;
}

export interface InvoiceDto {
  invoiceId: number;
  customerId: number;
  totalAmount: number;
  createdAt: string; 
  items: InvoiceItemDto[];
}


export interface Invoiced {
  invoiceId: number;
  customerName: string;
  date: string;        
  total: number;
  productName: string;
  quantity: number;
  sellingPrice: number;
}
