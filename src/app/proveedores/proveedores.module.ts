import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { HomeComponent } from './home/home.component';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { SharedModule } from '../shared/shared.module';
import { FormProveedorComponent } from './form-proveedor/form-proveedor.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ListaProveedoresComponent,
    FormProveedorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProveedoresRoutingModule
  ]
})
export class ProveedoresModule { }
