import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: 'sistema',
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    component:PagesComponent,
    children:[
      {
        path:'productos',
        loadChildren:()=>import('../productos/productos.module').then(m=>m.ProductosModule) 
      },
      {
        path:'clientes',
        loadChildren:()=>import('../clientes/clientes.module').then(m=>m.ClientesModule) 
      },{
        path:'categorias',
        loadChildren:()=>import('../category/category.module').then(m=>m.CategoryModule)
      }
      
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
