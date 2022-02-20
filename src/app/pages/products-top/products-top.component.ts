import { Component, Input, OnInit } from '@angular/core';
import { ChartType, } from 'chart.js';

import { Color, Label, MultiDataSet } from 'ng2-charts';
import { Report } from 'src/app/interfaces/report';
@Component({
  selector: 'app-products-top',
  templateUrl: './products-top.component.html',
  styleUrls: ['./products-top.component.css']
})
export class ProductsTopComponent implements OnInit {
  @Input() products!:Report[];
  constructor() { }


  ngOnInit(): void {
  }
  
  
  public doughnutChartLabels: Label[] = this.names;
  public doughnutChartData: MultiDataSet = [
    this.quantitys
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    {
      backgroundColor: [
        '#0075ED',
        '#00BAF7',
        '#00E0DB',
        '#00F7AD',
        '#00ED63',
      ]
    }
  ]
  get  names():string[]{
    return this.products.map(p=>p.name!);
  }
  get  quantitys():number[]{
    return this.products.map(p=>p.quantity);
  }
}
