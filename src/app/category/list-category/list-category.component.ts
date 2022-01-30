import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  categorys:Category[]=[];
  load:boolean =true;;
  constructor(private categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getCategorys(true).subscribe(
      (resp)=>{
        if(resp.ok===true){
          this.categorys=resp.data;
          this.load=false;
        }else{
          this.load=false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal! ',
          
          });
        }
      
      }
    );
    

  }
  edit(id:number){
    this.router.navigate(['/sistema/categorias/editar-categoria',id]);
  }

  delete(id:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta accion no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) { 
        this.categoryService.activeCategory(id,false).subscribe(
          (resp)=>{
            if(resp.ok===true){

              Swal.fire(
                'Eliminado!',
                'La categoria ha sido eliminada.',
                'success'
              );
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal! ',
              
              });
            }
          });
      }
    })
  }

}
