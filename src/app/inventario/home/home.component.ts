import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products!:Product[];
  productS:string='';
  load:boolean=true;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    this.load=true;
    this.productService.searchInventary(this.productS).subscribe(resp=>{
      if(resp.ok===true){
        this.products=resp.data;
        this.load=false;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se encontraron resultados',
        });
        this.load=false;
      }
     
      
    });
  }
  buscar(){
    this.getProduct();
  }

}
