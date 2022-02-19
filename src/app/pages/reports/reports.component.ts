import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports!:number[];
  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.reportsService.getReports().subscribe(resp=>{
      this.reports=resp.data.reports;
    });
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
