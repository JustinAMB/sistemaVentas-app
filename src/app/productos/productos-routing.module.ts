import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ProductosComponent } from './productos.component';

const routes: Routes = [{
  path: '',
  component:ProductosComponent
},
{
  path: 'agregar-producto',
  component:FormProductoComponent
},{
  path: 'editar-producto/:id',
  component:FormProductoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
