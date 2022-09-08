import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  
  product: IProduct = {
    name: "",
    price: null 
  }
  
  enterSubmit(event: KeyboardEvent) {
    if(event.code == 'Enter') {
      this.createProduct()
    }
  }
  
  setProduct(id: number) {
    this.productService.readById(id).subscribe({
      next: (item) => {
        this.product.name = item.name;
        this.product.price = item.price;
      }
    })
  }
  
  createProduct() {
    if(this.product.name === "" || !this.product.price) {
      return this.productService.showMessage("Todos os campos devem ser preenchidos!", "msg-fail");
    }
    
    this.productService.showMessage("Operação concluída com sucesso!", "msg-success");
    this.productService.create(this.product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      }
    })
  };
  
  cancel() {
    this.router.navigate(['/products']);
  };
  
  ngOnInit(): void {
    this.setProduct(this.id)
  };
}
