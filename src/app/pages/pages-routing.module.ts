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
      ,{

        path:'usuarios',
        loadChildren:()=>import('../users/users.module').then(m=>m.UsersModule)
      }
      ,{
        path:'proveedores',
        loadChildren:()=>import('../proveedores/proveedores.module').then(m=>m.ProveedoresModule)
      },{
        path:'ventas',
        loadChildren:()=>import('../ventas/ventas.module').then(m=>m.VentasModule)
      },
      {
        path:'inventario',
        loadChildren:()=>import('../inventario/inventario.module').then(m=>m.InventarioModule)
      },
      {
        path:'compras',
        loadChildren:()=>import('../compras/compras.module').then(m=>m.ComprasModule)
      },{
        path:'caja',
        loadChildren:()=>import('../caja/caja.module').then(m=>m.CajaModule)
      },
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
