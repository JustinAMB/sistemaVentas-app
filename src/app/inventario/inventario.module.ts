import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { HomeComponent } from './home/home.component';
import {  FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListaInventarioComponent } from './lista-inventario/lista-inventario.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListaInventarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    InventarioRoutingModule
  ]
})
export class InventarioModule { }
