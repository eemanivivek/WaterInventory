import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    name: '',
    quantity: 0,
    capacity: 0,
    lastUpdated: ''
  };
 
  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
  this.product.lastUpdated = new Date().toISOString();
  this.productService.addProduct(this.product).subscribe(() => {
    alert('Product added successfully!');
    this.router.navigate(['/']);
  });
}
}
