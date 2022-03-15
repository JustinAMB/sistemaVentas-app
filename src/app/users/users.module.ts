import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './home/home.component';
import { FormUserComponent } from './form-user/form-user.component';
import { ListaUsersComponent } from './lista-users/lista-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    FormUserComponent,
    ListaUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
