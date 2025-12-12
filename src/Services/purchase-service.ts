import { inject, Injectable } from '@angular/core';
import { CustomerService } from './customer-service';
import { Observable } from 'rxjs';
import { GetPurchaseDto } from '../Interfaces/purchases';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  url = 'http://localhost:5251/api/Purchase/all';
  private customerService = inject(CustomerService);

  getPurchase(): Observable<GetPurchaseDto[]> {
    return this.customerService.http.get<GetPurchaseDto[]>(this.url);
  }

  getCompletedPurchase(): Observable<GetPurchaseDto[]> {
    return this.customerService.http.get<GetPurchaseDto[]>(
      'http://localhost:5251/api/Purchase/completedpurchase'
    );
  }
  getPendingPurchase(): Observable<GetPurchaseDto[]> {
    return this.customerService.http.get<GetPurchaseDto[]>(
      'http://localhost:5251/api/Purchase/pendingpurchase'
    );
  }
  getDelayedPurchase(): Observable<GetPurchaseDto[]> {
    return this.customerService.http.get<GetPurchaseDto[]>(
      'http://localhost:5251/api/Purchase/delayedpurchase'
    );
  }
}
