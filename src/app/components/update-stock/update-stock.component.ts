import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-update-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {
  productId: number = 0;
  product: Product = {
    id: 0,
    name: '',
    quantity: 0,
    capacity: 0,
    lastUpdated: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProducts().subscribe(products => {
      const found = products.find(p => p.id === this.productId);
      if (found) this.product = found;
    });
  }

  // updateStock() {
  //   this.product.lastUpdated = new Date().toISOString();
  //   this.productService.updateProduct(this.productId, this.product).subscribe(() => {
  //     alert('Stock updated successfully!');
  //     this.router.navigate(['/']);
  //   });
  // }
}
