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
  createdAt: string;
  total: number;
  productName: string;
  quantity: number;
  sellingPrice: number;
}

export interface InvoiceGetDto {
  invoiceId: number;
  customerName: string;
  total: number;
  createdAt: string;
  items: InvoiceItemGetDto[];
}

export interface InvoiceItemGetDto {
  productName: string;
  stock: number;
  quantity: number;
  productPrice: number;
}
