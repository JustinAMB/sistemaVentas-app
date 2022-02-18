import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { HomeComponent } from './home/home.component';
import { ListaSellsComponent } from './lista-sells/lista-sells.component';
import { ViewSellComponent } from './view-sell/view-sell.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    ListaSellsComponent,
    ViewSellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CajaRoutingModule
  ]
})
export class CajaModule { }
