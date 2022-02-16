import { Component, OnInit } from '@angular/core';
import { SellDetail } from 'src/app/interfaces/sell-detail';
import { SellDetailsService } from 'src/app/services/sell-details.service';

@Component({
  selector: 'app-lista-detalles',
  templateUrl: './lista-detalles.component.html',
  styleUrls: ['./lista-detalles.component.css']
})
export class ListaDetallesComponent implements OnInit {

  constructor(private detailsService:SellDetailsService) { }

  ngOnInit(): void {
  }
  get details(): SellDetail[] {
    return this.detailsService.details;
  }
  delete(index:number){
    this.detailsService.deleteDetail(index);
  }

}
