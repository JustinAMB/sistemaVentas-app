import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.css']
})
export class ListaUsersComponent implements OnInit {
  users!:User[];
  load:boolean=true;
  constructor(private router:Router, private  userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(true).subscribe(resp=>{
      if(resp.ok===true){
        this.users=resp.data as User[];
        this.load=false;
      }else{
        this.load=false;
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'Hubo un error al cargar los usuarios'
        });
      }
    });
  }
  edit (id:number){
    this.router.navigate(['/sistema/users/editar-user',id]);
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
        this.userService.activeUser(id,false).subscribe(
          (resp)=>{
            if(resp.ok===true){

              Swal.fire(
                'Eliminado!',
                'EL usuario ha sido eliminada.',
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
