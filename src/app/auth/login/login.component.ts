import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
  });
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
  }
  campoNoValido( campo: string ) {
    return this.form.get(campo)?.invalid
            && this.form.get(campo)?.touched;
  }
  get emailErrorMsg(): string {
    const errors= this.form.get('email')?.errors;
    if(errors?.required){
      return 'Debe ingresar un email';
    } else if(errors?.email){
      return 'El valor ingresado no tiene formato de correo';
    }
    return '';
  }
  get passwordErrorMsg(): string {
    const errors= this.form.get('password')?.errors;
    if(errors?.required){
      return 'Debe ingresar una contraseña';
    } else if(errors?.minlength){
      return 'la contraseña debe tener como minimo 8 caracteres';
    }
    return '';
  }


  login(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      const {email,password}=this.form.value;
      this.authService.login(email,password).subscribe(resp=>{
        if(resp.ok){
          this.router.navigate(['/']);
        }
        else{
          Swal.fire('Error',resp.message,'error');
        }
      });
    }

  }

}
