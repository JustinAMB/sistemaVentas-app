import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Resp } from '../interfaces/resp';
import { Sell } from '../interfaces/sell';
import { SellDetail } from '../interfaces/sell-detail';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  private baseUrl:string=environment.api;
  constructor(private http:HttpClient) { }
  


  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return{
      headers:{
        'x-access-token':this.token
      }
    }
  }

  addSell(kind:number,sell:Sell,details:SellDetail[]):Observable<Resp> {
    const url=`${this.baseUrl}sell/${kind}`; 
    return this.http.post<Resp>(url,{...sell,details},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );
  }

  
}
