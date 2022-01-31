import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoryComponent } from './list-category/list-category.component';
import { HomeComponent } from './home/home.component';
import { FormCategoryComponent } from './form-category/form-category.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListCategoryComponent,
    HomeComponent,
    FormCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
