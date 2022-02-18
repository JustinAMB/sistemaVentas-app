import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Sell } from 'src/app/interfaces/sell';
import { SellDetail } from 'src/app/interfaces/sell-detail';
import { SellService } from 'src/app/services/sell.service';

@Component({
  selector: 'app-view-sell',
  templateUrl: './view-sell.component.html',
  styleUrls: ['./view-sell.component.css']
})
export class ViewSellComponent implements OnInit {
  details!:SellDetail[];
  sell!:Sell;
  constructor(private sellService: SellService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) =>this.sellService.getSell(id))
    ).subscribe(resp=>{
      this.sell=resp.data.sell ;
      this.details=resp.data.details;
    });
  }

}
