import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  id!:number;
  constructor(private router:Router,private activatedRoute: ActivatedRoute,private productService:ProductService) { 
    if (!this.router.url.includes('editar')) {
      console.log('editar2');
      return;
    }
    console.log('editar');
    this.activatedRoute.params.pipe(
      tap(params=>{this.id=Number(params['id'])}),
      switchMap(({ id }) =>this.productService.getProduct(this.id))
    ).subscribe(resp=>{
      console.log(resp);
    }
    );
  }

  ngOnInit(): void {
  }

}
