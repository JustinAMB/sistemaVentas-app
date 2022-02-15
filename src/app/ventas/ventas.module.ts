import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { HomeComponent } from './home/home.component';
import { ListaDetallesComponent } from './lista-detalles/lista-detalles.component';
import { FormDetalleComponent } from './form-detalle/form-detalle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    ListaDetallesComponent,
    FormDetalleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
