import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: 'sistema',
    component:PagesComponent,
    children:[
      {
        path:'productos',
        loadChildren:()=>import('../productos/productos.module').then(m=>m.ProductosModule) 
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
