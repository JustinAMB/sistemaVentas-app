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
      route:"/sistema",
      icon:'uil uil-house-user'
    },
    {
      name:"Ventas",
      route:"/sistema/ventas",
      icon:'uil uil-shopping-cart'
    },{
      name:"Caja",
      route:"/sistema/caja",
      icon:'uil uil-dollar-alt'
    },{
      name:"Compras",
      route:"/sistema/compras",
      icon:'uil uil-invoice'
    },{
      name:"Categorias",
      route:"/sistema/categorias",
      icon:'uil uil-label'
    },{
      name:"Productos",
      route:"/sistema/productos",
      icon:'uil uil-cube'
    },{
      name:"Proveedores",
      route:"/sistema/proveedores",
      icon:'uil uil-truck'
    },
    {
      name:"Clientes",
      route:"/sistema/clientes",
      icon:'uil uil-users-alt'
    },{
      name:"Inventario",
      route:"/sistema/inventario",
      icon:'uil uil-comparison'
    },
    {
      name:"Usuarios",
      route:"/sistema/usuarios",
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
    this.router.navigate([route]);
  }
  cambiarNavbar(){
    this.responsive.navbar=!this.responsive.navbar;
  }
  isRouteActive(route:string):boolean{
    return this.router.isActive(route,true);
    
  }

  get tam():boolean{
    if(window.innerWidth>=768){
      this.cambiarNavbar();
    }
    return window.innerWidth<768;
  }
}
