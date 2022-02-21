import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports!:number[];
  load:boolean=true;
  productsTop!:Report[];
  categories!:Report[];
  sells!:Report[];
  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.reportsService.getReports().subscribe(resp=>{
      this.reports=resp.data.reports;
      this.productsTop=resp.data.sellFav;
      this.categories=resp.data.productXcategory;
      this.sells=resp.data.sellDay;
      this.load=false;
    });
  }
  
}
