import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  @Input() products!:Product[];
  current:number=1;
  categorias!:Category[];
  constructor(private router:Router,private productService:ProductService,private categoryService:CategoryService) { }
  getCategoria(id:number):string{
    if(this.categorias){
      const categoria=this.categorias.find((categoria:Category)=>categoria.id===id);
      return categoria!.name;
  
    }
    return '';
  }

  ngOnInit(): void {
    this.categoryService.getCategorys(true).subscribe(
      (resp)=>{
        this.categorias=resp.data;
      }
    );
    


    
  }
  edit (id:number){
    this.router.navigate(['/sistema/productos/editar-producto',id]);
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
        this.productService.activeProduct(id,false).subscribe(
          (resp)=>{
            if(resp.ok===true){

              Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminada.',
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
