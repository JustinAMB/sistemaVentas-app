import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  imgUrl!:string;
  id!:number;
  form:FormGroup =this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    lastname:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    rol:['',[Validators.required]],
  })
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uploadService: UploadService,
    private userService: UserService) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      console.log('editar2');
      return;
    }
    console.log('editar');
    this.activatedRoute.params.pipe(
      tap(params=>{this.id=Number(params['id'])}),
      switchMap(({ id }) =>this.userService.getUser(this.id))
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
      return 'El email debe de tener un formato valido';
    }
    return '';
  }
  get rolErrorMsg(): string {
    const errors= this.form.get('rol')?.errors;
    if(errors?.required){
      return 'Debe seleccionar un rol';
    }
    return '';
  }

  upload(event:any){
    
    const file = event.target.files[0];
    this.uploadService.upload(file,'users').subscribe(resp=>{
      console.log(resp);
      this.imgUrl=resp.data;
    });
  }
  save() {
    if(this.form.invalid){
      return;
    }
    const user=this.form.value as User;
    user.image=this.imgUrl;
    console.log(user);
    if(this.router.url.includes('editar')){
      user.id=this.id;
      this.userService.editUser(user).subscribe(resp=>{
        console.log(resp);
        this.router.navigate(['/sistema/usuarios']);
      });
    }else{
      this.userService.addUser(user).subscribe(resp=>{
        console.log(resp);
        this.router.navigate(['/sistema/usuarios']);
      });
    }
  }

}
