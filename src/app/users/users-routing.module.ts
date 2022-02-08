import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './form-user/form-user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
  path: '',
  component:HomeComponent,
},
{
  path:'agregar-usuario',
  component:FormUserComponent
},{
  path:'editar-usuario/:id',
  component:FormUserComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
