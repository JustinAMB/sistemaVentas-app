import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCategoryComponent } from './form-category/form-category.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    data: { titulo: 'ProgressBar' }
  },
  {
    path:'editar-categoria/:id',
    component:FormCategoryComponent
  },
  {
    path:'agregar-categoria',
    component:FormCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
