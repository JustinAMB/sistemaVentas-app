import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {
  id!:number;
  form:FormGroup=this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
  });

  constructor(private fb:FormBuilder,private categoryService:CategoryService,private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      console.log('editar2');
      return;
    }
    
      console.log('editar');
      this.activatedRoute.params.pipe(

        tap(params=>{this.id=Number(params['id'])}),
        switchMap(({ id }) =>this.categoryService.getCategory(this.id))
      ).subscribe(resp=>{
      
        
        if(resp.ok===true){
          const {name}=resp.data as Category;
          console.log(name);
          this.form.reset({
            name
          });
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

  save(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      const {name}=this.form.value;
      const category:Category={
        name
      };
      if(this.router.url.includes('editar')){
        category.id=this.id;
        this.categoryService.editCategory(category).subscribe(resp=>{
          if(resp.ok===true){
            Swal.fire('Categoria editada',resp.message,'success');
          }else{
            Swal.fire('Error','Ha ocurrido un error intentalo de nuevo. ','error');
          }
        });
      }else{
        this.categoryService.addCategory(category).subscribe(resp=>{
          if(resp.ok===true){
            Swal.fire('Categoria creada',resp.message,'success');
          }
          else{
            Swal.fire('Error','Ha ocurrido un error intentalo de nuevo. ','error');
          }
        });
      }
    }
  }
}
