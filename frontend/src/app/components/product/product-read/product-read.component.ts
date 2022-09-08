import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';
import { ProductReadDataSource } from './product-read-datasource';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  animation
} from '@angular/animations';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css'],
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
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-in'))
    ])
  ]
})
export class ProductReadComponent implements OnInit {

  myState = 'active';

  @ViewChild(MatTable) table!: MatTable<IProduct>;
  dataSource: ProductReadDataSource;
  
  products!: IProduct[];
  displayedColumns = ['name', 'price', 'action'];

  activeDeleteBox(id?: number){
    if(id) this.productService.setId(id);
    this.myState = this.myState == 'inactive' ? 'active' : 'inactive'; // Ainda não funciona;

    return this.productService.setShowDeleteBox();
  };

  constructor(
    private productService: ProductService,
    private router: Router
    ) {
    this.dataSource = new ProductReadDataSource();
  };

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      }
    });
  };

  ngOnInit(): void {
    this.productService.read().subscribe({
      next: products => {
        this.products = products;
      }
    });
  };
};
