import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellDetail } from 'src/app/interfaces/sell-detail';
import { ProductService } from 'src/app/services/product.service';
import { SellDetailsService } from 'src/app/services/sell-details.service';

@Component({
  selector: 'app-form-detalle',
  templateUrl: './form-detalle.component.html',
  styleUrls: ['./form-detalle.component.css']
})
export class FormDetalleComponent implements OnInit {
  details:SellDetail[]=[];
  form:FormGroup=this.fb.group({
    quantity:[0,[Validators.required,Validators.min(1)]],
    priceUnit:[0,[Validators.required,Validators.min(1)]],
    barcode:['',[Validators.required,Validators.minLength(8)]],
  
  })
  constructor(private fb:FormBuilder,private detailsService:SellDetailsService,private productService:ProductService) { }

  ngOnInit(): void {
  }
  campoNoValido( campo: string ) {
    return this.form.get(campo)?.invalid
            && this.form.get(campo)?.touched;
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
    return '';
  }
  get barcodeErrorMsg(): string {
    const errors= this.form.get('barcode')?.errors;
    if(errors?.required){
      return 'Debe ingresar un código de barras';
    } else if(errors?.minLength){
      return 'El código de barras debe tener 8 caracteres';
    }
    return '';
  }
  add(){
    const detail:SellDetail={
      ...this.form.value}
  }
}
