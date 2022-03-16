import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  items=[
    {
      name:"Inicio",
      route:"/",
      icon:'uil uil-house-user'
    },
    {
      name:"Ventas",
      route:"/ventas",
      icon:'uil uil-shopping-cart'
    },{
      name:"Caja",
      route:"/caja",
      icon:'uil uil-cash-register'
    },{
      name:"Compras",
      route:"/compras",
      icon:'uil uil-invoice'
    },{
      name:"Categorias",
      route:"/categorias",
      icon:'uil uil-label'
    },{
      name:"Productos",
      route:"/productos",
      icon:'uil uil-cube'
    },{
      name:"Proveedores",
      route:"/proveedores",
      icon:'uil uil-truck'
    },
    {
      name:"Clientes",
      route:"/clientes",
      icon:'uil uil-users-alt'
    },{
      name:"Inventario",
      route:"/inventario",
      icon:'uil uil-comparison'
    },
    {
      name:"Usuarios",
      route:"/usuarios",
      icon:'uil uil-user-md'
    }


  ];
  constructor(private router:Router,private responsive:ResponsiveService) { }
  get navbar():boolean{
    return this.responsive.navbar;
  }
  ngOnInit(): void {
  }

  navegar(route:string){
    this.router.navigate(['/sistema/'+route]);
  }
  cambiarNavbar(){
    this.responsive.navbar=!this.responsive.navbar;
  }


  get tam():boolean{
    if(window.innerWidth>=768){
      this.cambiarNavbar();
    }
    return window.innerWidth<768;
  }
}
