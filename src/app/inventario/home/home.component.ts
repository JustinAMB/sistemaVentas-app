import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products!:Product[];
  productS:string='';
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    this.productService.searchInventary(this.productS).subscribe(resp=>{
      this.products=resp.data;
    });
  }
  buscar(){
    this.getProduct();
  }

}
