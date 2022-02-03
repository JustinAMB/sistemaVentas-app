import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  id!:number;
  form:FormGroup=this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    lastname:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.minLength(8)]],
    address:['',[Validators.required,Validators.minLength(15)]],

  });
  constructor(
    private fb:FormBuilder,
    private personService:PersonService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      console.log('editar2');
      return;
    }
    console.log('editar');
    this.activatedRoute.params.pipe(
      tap(params=>{this.id=Number(params['id'])}),
      switchMap(({ id }) =>this.personService.getPerson(this.id))
    ).subscribe(resp=>{
      if(resp.ok===true) {
        const {name,lastname,email,phone,address}=resp.data;
        this.form.reset({
          name,
          lastname,
          email,
          phone,
          address
        });
      }
      else{
        Swal.fire('Error','Hubo un error al cargar la informacion','error');
      }
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
  get lastnameErrorMsg(): string {
    const errors= this.form.get('lastname')?.errors;
    if(errors?.required){
      return 'Debe ingresar un apellido';
    } else if(errors?.minlength){
      return 'El apellido debe de tener como minimo 3 caracteres';
    }
    return '';
  }
  get emailErrorMsg(): string {
    const errors= this.form.get('email')?.errors;
    if(errors?.required){
      return 'Debe ingresar un email';
    } else if(errors?.email){
      return 'Debe ingresar un email valido';
    }
    return '';
  }
  get phoneErrorMsg(): string {
    const errors= this.form.get('phone')?.errors;
    if(errors?.required){
      return 'Debe ingresar un telefono';
    } else if(errors?.minlength){
      return 'El telefono debe de tener como minimo 8 caracteres';
    }
    return '';
  }
  get addressErrorMsg(): string {
    const errors= this.form.get('address')?.errors;
    if(errors?.required){
      return 'Debe ingresar una direccion';
    } else if(errors?.minlength){
      return 'La direccion debe de tener como minimo 15 caracteres';
    }
    return '';
  }
  save(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      const {name,lastname,email,phone,address}=this.form.value;
      const data={name,lastname,email,phone,address};
      if(this.router.url.includes('editar')){
        this.personService.editPerson(this.id,data).subscribe(resp=>{
          if(resp.ok===true){
            Swal.fire('Exito','cliente actualizado correctamente','success');
            
          }else{
            Swal.fire('Error','Hubo un error al actualizar el cliente','error');
          }
        });
      }else{
        this.personService.addPerson(-1,data).subscribe(resp=>{
          if(resp.ok===true){
            Swal.fire('Exito','cliente creado correctamente','success');
            
          }else{
            Swal.fire('Error','Hubo un error al crear el cliente','error');
          }
        });
      }

    }
      

  }

}
