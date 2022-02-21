import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-general',
  templateUrl: './reports-general.component.html',
  styleUrls: ['./reports-general.component.css']
})
export class ReportsGeneralComponent implements OnInit {
  @Input() reports!:number[];
  constructor() { }

  ngOnInit(): void {
  }
  
  info=[
    {
      title:'N° de Categorias',
      icon:'uil uil-label'
    },
    {
      title:'N° de Clientes',
      icon:'uil uil-users-alt'
    },
    {
      title:'N° de Proveedores',
      icon:'uil uil-truck'
    },
    {
      title:'N° de Empleados',
      icon:'uil uil-user-md'
    },
    {
      title:'N° de Productos',
      icon:'uil uil-cube'
    },
    {
      title:'Stock bajo',
      icon:'uil uil-comparison'
    },
    {
      title:'Total de Ventas',
      icon:'uil uil-shopping-cart'
    },
    {
      title:'Total compras',
      icon:'uil uil-invoice'
    },
    {
      title:'Total de Ganancias',
      icon:'uil uil-dollar-alt'
    }
  ]
}
