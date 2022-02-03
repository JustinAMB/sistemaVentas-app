import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProveedorComponent } from './form-proveedor/form-proveedor.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },{
    path:'agregar-proveedor',
    component:FormProveedorComponent
  },
  {
    path:'editar-proveedor/:id',
    component:FormProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
