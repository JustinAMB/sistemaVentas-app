import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { SellDetail } from 'src/app/interfaces/sell-detail';
import { ProductService } from 'src/app/services/product.service';
import { SellDetailsService } from 'src/app/services/sell-details.service';

@Component({
  selector: 'app-form-detalle',
  templateUrl: './form-detalle.component.html',
  styleUrls: ['./form-detalle.component.css']
})
export class FormDetalleComponent implements OnInit {
  price!: number;
  name!:string;
  product!:number;
  productQuantity:number=0;
    form:FormGroup = this.fb.group({
        barcode: ['',[Validators.required,Validators.minLength(8)]],
        quantity:[1,[Validators.required,Validators.min(1)]]});
  constructor(private fb:FormBuilder,private productService:ProductService,private detailsService:SellDetailsService) { }

  ngOnInit(): void {
    this.form.get('quantity')?.disable();
  }
  campoNoValido( campo: string ) {
    return this.form.get( campo )?.invalid && this.form.get( campo )?.touched;
  }
 
  get quantityErrorMsg(): string {
    const errors= this.form.get('quantity')?.errors;
    if(errors?.required){
      return 'Debe ingresar una cantidad';
    } else if(errors?.min){
      return 'La cantidad debe ser mayor a 0';
    } 
    return '';
  }
  get priceUnitErrorMsg(): string {
    const errors= this.form.get('priceUnit')?.errors;
    if(errors?.required){
      return 'Debe ingresar un precio unitario';
    } else if(errors?.min){
      return 'El precio unitario debe ser mayor a 0';
    }
    else if(errors?.cantidad){
      return 'La cantidad ingresada es mayor a la disponible';
    }

    return '';
  }
  get barcodeErrorMsg(): string {
    const errors= this.form.get('barcode')?.errors;
    if(errors?.required){
      return 'Debe ingresar un código de barras';
    } else if(errors?.minLength){
      return 'El código de barras debe tener 8 caracteres';
    }else if(errors?.code){
      return 'El código de barras no existe';

    }
    return '';
  }
  add(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      const detail:SellDetail={
        ...this.form.value,
        product:this.product,
        name:this.name,
        priceUnit:this.price

      }
      console.log(detail);
        this.detailsService.addDetail(detail);
        this.form.reset();
    }
   
  }

  codigoExiste(){
    const code=this.form.get('barcode')?.value;
    this.productService.getProducts(true).subscribe(resp=>{
      const rs=resp.data?.find((p:Product)=>p.barcode==code);
      if(rs){
        this.product=rs.id;
        this.name=rs.name;
        this.price=rs.price;
        this.productQuantity=rs.inventary;
        this.form.get('quantity')?.enable();
      }else{
        this.form.get('barcode')?.setErrors({code:true});
        this.form.get('quantity')?.disable();
      }

    });

  } 
  cantidadDisponible(){
    const quantity=this.form.get('quantity')?.value;
    
    if(quantity>=this.productQuantity){
      this.form.get('quantity')?.setErrors({cantidad:true});
    }
  }

}
