import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Report } from 'src/app/interfaces/report';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.css']
})
export class ProductsCategoriesComponent implements OnInit {

  constructor() { }

  
  @Input() products:Report[]=[];
  
  public chartOptions: ChartOptions = {
  
  };

  ngOnInit(): void {
    console.log(this.products);
    this.chartLabels = this.names;
        this.chartData=[
          { data: this.quantitys, label: 'Categorias', backgroundColor: '#ED5F76', hoverBackgroundColor: 'red'}
        ];

        this.chartOptions= {
          responsive: true,
          scales: {
            xAxes: [{
              
              gridLines: {
                  display: true,
                  z:5,
                  drawBorder:true
      
              },
              ticks: {
                  min: 0,
                  max: this.quantitys[0]+1,
                  stepSize: .5,
                  beginAtZero: true
                  
      
              }
          }],
          }
        };
  }
  
  
  public chartLabels: Label[] = [];
  public chartData: ChartDataSets[] = [
    
  ];
  public chartType: ChartType = 'horizontalBar';

  
  get  names():string[]{
    return this.products.map(p=>p.name!) ||['','','','','',''];
  }
  get  quantitys():number[]{
    return this.products.map(p=>p.quantity) || [0,0,0,0,0];
  }

}
