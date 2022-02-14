import { Injectable } from '@angular/core';
import { SellDetail } from '../interfaces/sell-detail';

@Injectable({
  providedIn: 'root'
})
export class SellDetailsService {
  private _details: SellDetail[] =[];
  get details(): SellDetail[] {
    return [...this._details];
  }
  constructor() { }
  addDetail(detail: SellDetail) {
    this._details.push(detail);
  }
  deleteDetail(index: number) {
    this._details.splice(index, 1);
  }
  get total():number[] {
    const total=[];
    total.push( this._details.reduce((total,detail)=>total+detail.priceUnit*detail.quantity,0));
    total.push(total[0]*0.13);  
    total.push(total[0]+total[1]);  
    return total;

  }
}
