import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormDetalleComponent } from './form-detalle/form-detalle.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';


@NgModule({
  declarations: [
    HomeComponent,
    FormDetalleComponent,
    ListaComprasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
