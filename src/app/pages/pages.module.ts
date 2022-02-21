import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReportsComponent } from './reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { ProductsTopComponent } from './products-top/products-top.component';

import { ProductsCategoriesComponent } from './products-categories/products-categories.component';
import { SellDaysComponent } from './sell-days/sell-days.component';
import { ReportsGeneralComponent } from './reports-general/reports-general.component';
@NgModule({
  declarations: [
    PagesComponent,
    ReportsComponent,
    ProductsTopComponent,
 
    ProductsCategoriesComponent,
      SellDaysComponent,
      ReportsGeneralComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    
    RouterModule,    
    BrowserModule ,
    PagesRoutingModule,
   ChartsModule 
  ]
})
export class PagesModule { }
