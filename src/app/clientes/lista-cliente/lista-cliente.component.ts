import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/person';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  current:number=1;

  @Input() clientes!:Person[] ;

  constructor(private router:Router, private personService:PersonService) { }

  ngOnInit(): void {
    


  }
  edit(id:number){
    this.router.navigate(['/sistema/clientes/editar-cliente',id]);
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
                'EL cliente ha sido eliminada.',
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
