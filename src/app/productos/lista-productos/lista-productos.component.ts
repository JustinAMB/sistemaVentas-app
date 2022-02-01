import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  products!:Product[];
  load:boolean=true;
  constructor(private router:Router,private productService:ProductService) { }
 

  ngOnInit(): void {
    this.productService.getProducts().subscribe(resp=>{
      if(resp.ok===true){
        this.products=resp.data as Product[];
        this.load=false;
      }else{
        this.load=false;
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'Hubo un error al cargar los productos'
        });
        
      }
    });
  }
  edit (id:number){
    this.router.navigate(['/productos/editar-producto',id]);
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
