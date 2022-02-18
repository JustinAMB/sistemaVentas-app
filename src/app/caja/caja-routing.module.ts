import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewSellComponent } from './view-sell/view-sell.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },{
    path:'ver-detalle/:id'
    ,
    component: ViewSellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
