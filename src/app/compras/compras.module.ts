import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormDetalleComponent } from './form-detalle/form-detalle.component';


@NgModule({
  declarations: [
    HomeComponent,
    FormDetalleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
