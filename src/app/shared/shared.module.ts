import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent
  ],
  exports: [NavBarComponent,HeaderComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
