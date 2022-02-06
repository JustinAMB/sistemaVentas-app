import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { SharedModule } from '../shared/shared.module';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    ProductosComponent,
    ListaProductosComponent,
    FormProductoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
