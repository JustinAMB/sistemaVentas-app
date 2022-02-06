import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  imag!:string;
  id!:number;
  constructor(
    private uploadService: UploadService,
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private productService:ProductService) { 
   
    
  }

  ngOnInit(): void {
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
    });
  }
  upload(event:any) {
    // Get input file
    const file = event.target.files[0];

    this.uploadService.upload(file,'products').subscribe(resp=>{
      console.log(resp);

    });

    
  }

  



}
