import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Product } from 'src/app/interfaces/product';
import { Report } from 'src/app/interfaces/report';

@Component({
  selector: 'app-sell-days',
  templateUrl: './sell-days.component.html',
  styleUrls: ['./sell-days.component.css']
})
export class SellDaysComponent implements OnInit {
  @Input() products:Report[]=[];
  constructor() { }
  get  names():string[]{
    return this.products.map(p=>this.getDate(p.name!)) ||['','','','','',''];
  }
  get  quantitys():number[]{
    return this.products.map(p=>p.quantity) || [0,0,0,0,0];
  }
  ngOnInit(): void {
        var canvas = <HTMLCanvasElement> document.getElementById('myChart');
        var ctx = canvas.getContext('2d')!;
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...this.names],
                datasets: [{
                    label: 'Dias',
                    data: [ 
                     ...this.quantitys
                    
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {

              /*********
               *  bounds?: string | undefined;
                  type?: ScaleType | string | undefined;
                  display?: boolean | string | undefined;
                  id?: string | undefined;
                  labels?: string[] | undefined;
                  stacked?: boolean | undefined;
                  position?: string | undefined;
                  ticks?: TickOptions | undefined;
                  gridLines?: GridLineOptions | undefined;
                  scaleLabel?: ScaleTitleOptions | undefined;
                  time?: TimeScale | undefined;
                  offset?: boolean | undefined;
               */
                scales: {
                  yAxes: [{
                    
                    gridLines: {
                        display: true,
                        z:5,
                        drawBorder:true

                    },
                    ticks: {
                        min: 0,
                        stepSize: 5000,
                        beginAtZero: true
                        
        
                    }
                }],
                }
            }
        });
  }
  getDate(tiempoTranscurrido:string):string{
    
    const hoy = new Date(tiempoTranscurrido);
    return hoy.toLocaleDateString();
  }
  

  




  
}
