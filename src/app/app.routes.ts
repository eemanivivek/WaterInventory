import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateStockComponent } from './components/update-stock/update-stock.component';

export const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-stock/:id', component: UpdateStockComponent },
  { path: '', component: ProductListComponent },

];
