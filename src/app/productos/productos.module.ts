import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { SharedModule } from '../shared/shared.module';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductosComponent,
    ListaProductosComponent,
    FormProductoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,NgxPaginationModule ,
    PipesModule,
    ReactiveFormsModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
