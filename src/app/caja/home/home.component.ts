import { Component, OnInit } from '@angular/core';
import { SellDetailsService } from 'src/app/services/sell-details.service';
import { SellService } from 'src/app/services/sell.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  imprimir(){}

}
