import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellDetail } from 'src/app/interfaces/sell-detail';
import { SellService } from 'src/app/services/sell.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  details:SellDetail[]=[];
  form:FormGroup=this.fb.group({
    quatity:[0,[Validators.required,Validators.min(1)]],
    priceUnit:[0,[Validators.required,Validators.min(1)]],
    barcode:[],
  
  })
  constructor(private sellService:SellService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  addDetail(detail:SellDetail){
    this.details.push(detail);
  }
  deleteDetail(index:number){
    this.details.splice(index,1);
  } 

}
