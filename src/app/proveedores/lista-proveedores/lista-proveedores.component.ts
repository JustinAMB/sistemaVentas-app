import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/person';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {
  @Input() proveedores!:Person[] ;
  current:number=1 ;
  
  constructor(private router:Router, private personService:PersonService) { }

  ngOnInit(): void {
    

  }
  edit(id:number){
    this.router.navigate(['/sistema/proveedores/editar-proveedor',id]);
  }

  delete(id:number) {
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
        this.personService.activePerson(id,false).subscribe(
          (resp)=>{
            if(resp.ok===true){

              Swal.fire(
                'Eliminado!',
                'EL proveedor ha sido eliminada.',
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
