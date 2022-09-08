import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {};

  product: IProduct = {
    name: "",
    price: null 
  }

  enterSubmit(event: KeyboardEvent) {
    if(event.code == 'Enter') {
      this.createProduct()
    }
  }

  createProduct() {
    if(this.product.name === "" || !this.product.price) {
      return this.productService.showMessage("Todos os campos devem ser preenchidos!", "msg-fail");
    }

    this.productService.create(this.product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
        this.productService.showMessage("Produto criado com sucesso!", "msg-success");
      }
    })
  };

  cancel() {
    this.router.navigate(['/products']);
  };
}
