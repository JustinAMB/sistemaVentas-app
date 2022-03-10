import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeComponent,
    FormClienteComponent,
    ListaClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
