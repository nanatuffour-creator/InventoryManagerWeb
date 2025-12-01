import { Routes } from '@angular/router';

import { Register } from '../pages/register/register';
import { Login } from '../pages/login/login';
import { Layout } from '../Components/layout/layout';
import { Home } from '../pages/home/home';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Products } from '../pages/products/products';
import { Customers } from '../pages/customers/customers';
import { Suppliers } from '../pages/suppliers/suppliers';
import { Categories } from '../pages/categories/categories';
import { Invoices } from '../pages/invoices/invoices';
import { Purchases } from '../pages/purchases/purchases';
import { Addproducts } from '../pages/products/addproducts/addproducts';
import { EditProduct } from '../pages/products/edit-product/edit-product';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },

  {
    path: 'layout',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      {
        path: 'products',
        component: Products,
        children: [{ path: 'delete', component: EditProduct }],
      },
      { path: 'customers', component: Customers },
      { path: 'suppliers', component: Suppliers },
      { path: 'categories', component: Categories },
      { path: 'invoices', component: Invoices },
      { path: 'purchases', component: Purchases },
      // { path: 'settings', loadComponent: () => import('../pages/settings/settings').then(m => m.Settings) }
    ],
  },
  { path: 'add-product', component: Addproducts },
  { path: 'edit', component: EditProduct },
  // Redirect /layout → /layout/dashboard
  { path: 'layout', redirectTo: 'layout/dashboard', pathMatch: 'full' },
];
