import { Injectable } from '@angular/core';
import { SellDetail } from '../interfaces/sell-detail';

@Injectable({
  providedIn: 'root'
})
export class SellDetailsService {
    _details: SellDetail[] =[];
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
}
