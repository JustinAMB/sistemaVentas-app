import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Person } from 'src/app/interfaces/person';
import { Sell } from 'src/app/interfaces/sell';
import { SellDetail } from 'src/app/interfaces/sell-detail';
import { PersonService } from 'src/app/services/person.service';
import { SellService } from 'src/app/services/sell.service';

@Component({
  selector: 'app-view-sell',
  templateUrl: './view-sell.component.html',
  styleUrls: ['./view-sell.component.css']
})
export class ViewSellComponent implements OnInit {
  details!:SellDetail[];
  person!:Person;
  sell!:Sell;
  constructor(private sellService: SellService,private activatedRoute: ActivatedRoute,private personService: PersonService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) =>this.sellService.getSell(id))
    ).subscribe(resp=>{
      this.sell=resp.data.sell ;
      this.details=resp.data.details;
      this.personService.getPerson(this.sell.person!).subscribe(resp=>{
        this.person=resp.data;
      });
    });
    
    
  }
  getDate(fecha:Date):string{
    
    const hoy = new Date(fecha);
    return hoy.toLocaleString().split(',').join('');
  }
}
