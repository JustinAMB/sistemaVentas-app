import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  imgUrl!:string;
  id!:number;
  categories!:Category[];
  form:FormGroup=this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    price:['',[Validators.required,Validators.min(0)]],
    description:['',[Validators.required,Validators.minLength(10)]],
    category:['',[Validators.required]],
    inventary_min:[1,[Validators.required,Validators.min(1)]],
    barcode:['',[Validators.required,Validators.minLength(8)]],
    unit:['',[Validators.required]],
  })
  constructor(
    private uploadService: UploadService,
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private productService:ProductService,private categoryService:CategoryService) { 
   
    
  }

  ngOnInit(): void {
    this.categoryService.getCategorys(true).subscribe(resp=>{
      this.categories=resp.data;
    });
    if (!this.router.url.includes('editar')) {
      console.log('editar2');
      return;
    }
    console.log('editar');
    this.activatedRoute.params.pipe(
      tap(params=>{this.id=Number(params['id'])}),
      switchMap(({ id }) =>this.productService.getProduct(this.id))
    ).subscribe(resp=>{
      this.form.patchValue(resp.data);
      this.imgUrl=resp.data.image;
    });
    
  }
  campoNoValido( campo: string ) {
    return this.form.get(campo)?.invalid
            && this.form.get(campo)?.touched;
  }
  get nameErrorMsg(): string {
    const errors= this.form.get('name')?.errors;
    if(errors?.required){
      return 'Debe ingresar un nombre';
    } else if(errors?.minlength){
      return 'El nombre debe de tener como minimo 3 caracteres';
    }
    return '';
  }

  get priceErrorMsg(): string {
    const errors= this.form.get('price')?.errors;
    if(errors?.required){
      return 'Debe ingresar un precio';
    } else if(errors?.min){
      return 'El precio debe de ser mayor a 0';
    }
    return '';
  }
  get descriptionErrorMsg(): string {
    const errors= this.form.get('description')?.errors;
    if(errors?.required){
      return 'Debe ingresar una descripcion';
    } else if(errors?.minlength){
      return 'La descripcion debe de tener como minimo 10 caracteres';
    }
    return '';
  }
  get barcodeErrorMsg(): string {
    const errors= this.form.get('barcode')?.errors;
    if(errors?.required){
      return 'Debe ingresar un codigo de barras';
    } else if(errors?.minlength){
      return 'El codigo de barras debe de tener como minimo 8 caracteres';
    }
    return '';
  }
  get inventaryErrorMsg(): string {
    const errors= this.form.get('inventary_min')?.errors;
    if(errors?.required){
      return 'Debe ingresar un inventario minimo';
    } else if(errors?.min){
      return 'El inventario minimo debe de ser mayor a 0';
    }
    return '';
  }
  get categoryErrorMsg(): string {
    const errors= this.form.get('category')?.errors;

    if(errors?.required){
      return 'Debe seleccionar una categoria';
    }
    return '';
  }
  get unitErrorMsg(): string {
    const errors= this.form.get('unit')?.errors;
    if(errors?.required){
      return 'Debe seleccionar una unidad';
    }
    return '';
  }
  save() {
    if(this.form.invalid){
      return;
    }
    const product=this.form.value;
    product.image=this.imgUrl;
    console.log(product);
    if(this.router.url.includes('editar')){
      product.id=this.id;
      this.productService.editproduct(product).subscribe(resp=>{
        console.log(resp);
        this.router.navigate(['/productos']);
      });
    }else{
      this.productService.addProduct(product).subscribe(resp=>{
        console.log(resp);
        this.router.navigate(['/productos']);
      });
    }
  }
  upload(event:any) {
    // Get input file
    const file = event.target.files[0];

    this.uploadService.upload(file,'products').subscribe(resp=>{
      console.log(resp);
      this.imgUrl=resp.data;

    });

    
  }

  



}
