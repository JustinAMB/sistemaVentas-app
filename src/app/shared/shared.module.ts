import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent,
    SpinnerComponent

  ],
  exports: [NavBarComponent,HeaderComponent,SpinnerComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
