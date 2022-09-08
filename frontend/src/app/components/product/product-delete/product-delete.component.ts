import {
  animate, state,
  style, transition, trigger
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
  animations: [                            // ==> Ainda não funciona
    trigger('divState', [
      state('inactive', style({
        marginTop: '-50px',
        opacity: '0%'
      })),
      state('active', style({
        marginTop: '50px',
        opacity: '100%'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-in'))
    ])
  ]
})
export class ProductDeleteComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  id = this.productService.id;
  products!: IProduct[];
  productName!: string;
  myState = "active"

  activeDeleteBox(){
    this.myState = this.myState == 'inactive' ? 'active' : 'inactive';
    return this.productService.setShowDeleteBox()
  }
  
  deleteProduct() {
    this.productService.delete(this.id).subscribe({
      next: () => {
        location.reload()
        this.activeDeleteBox()
      }
    });
  }

  ngOnInit(): void {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.readById(this.id).subscribe({
      next: (product => {
       this.productName = product.name;
      })
    });
  }

}
