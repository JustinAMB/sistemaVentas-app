import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { SellDetailsService } from 'src/app/services/sell-details.service';
import { SellService } from 'src/app/services/sell.service';
import { ViewSellService } from 'src/app/services/view-sell.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form:FormGroup=this.fb.group({
    correo:['',[Validators.required,Validators.email]]
  });

  
  constructor(
    private sellService:SellService,
    private detailsService:SellDetailsService,
    private viewSell:ViewSellService,
    private product:ProductService,
    private fb:FormBuilder,
    ) { }

  ngOnInit(): void {
  }
  get total():number[]{
    return this.detailsService.total;
  }
  campoValido( campo: string ) {
    return  this.form.get(campo)?.invalid
    && this.form.get(campo)?.touched;
  }

  get correoMsgError(): string {
    const errors= this.form.get('correo')?.errors;
    if(errors?.required){
      return 'Debe ingresar un correo';
    } else if(errors?.email){
      return 'Debe ingresar un correo válido';
    }
    return '';
  }
  get isDisabled(): boolean {
    return this.detailsService.details.length === 0 || this.form.invalid;
  }
  vender(){	
    this.form.markAllAsTouched();
    if(!this.isDisabled){
      const {correo}=this.form.value;
      this.sellService.addSell(-1,this.total[2],correo,this.detailsService.details).subscribe((resp)=>{
        console.log(resp);
        if(resp.ok===true){
          this.viewSell.imprimir(resp.data.sell,resp.data.details);
        }
        else
        {
          Swal.fire('Error',resp.message,'error');
        }
        
  
      });
    }
    
  }
  cancelar(){
    this.detailsService.clear();
  }

}
