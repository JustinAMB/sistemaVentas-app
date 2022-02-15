import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellDetail } from 'src/app/interfaces/sell-detail';
import { SellDetailsService } from 'src/app/services/sell-details.service';
import { SellService } from 'src/app/services/sell.service';
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

  
  constructor(private sellService:SellService,private detailsService:SellDetailsService,private fb:FormBuilder) { }

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
  comprar(){	
    this.form.markAllAsTouched();
    if(this.form.valid){
      const {correo}=this.form.value;
      this.sellService.addSell(1,this.total[2],correo,this.detailsService.details).subscribe((resp)=>{
        Swal.fire('Compra realizada','','success');
  
      });
    }
    
  }
  cancelar(){
    this.detailsService.clear();
  }

}
