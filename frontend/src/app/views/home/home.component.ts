import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/components/product/product.model';
import { ProductService } from 'src/app/components/product/product.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    private productService: ProductService
  ) {
    
    this.headerService.headerData = {
      title: "Início",
      icon: "home",
      routeUrl: "/"
    }
  }

  products!: IProduct[];

  ngOnInit(): void {
    this.productService.read().subscribe({
      next: (response) => {
        this.products = response;
      }
    })
  }

}
