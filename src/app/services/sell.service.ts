import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Resp } from '../interfaces/resp';
import { Sell } from '../interfaces/sell';
import { SellDetail } from '../interfaces/sell-detail';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  private baseUrl:string=environment.api;
  constructor(private http:HttpClient, private user:AuthService) { }
  


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

  addSell(kind:number,total:number,email:string,details:SellDetail[]):Observable<Resp> {
    const url=`${this.baseUrl}sell/${kind}`; 
    const body={
      total,
      email,
      details,
      user:this.user.user.id
    }
    return this.http.post<Resp>(url,body,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );
  }
  getSell(id:number):Observable<Resp>{
    const url=  `${this.baseUrl}sell/${id}`;
    return this.http.get<Resp>(url,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  

      
    );
  }
  getSellsByDay():Observable<Resp>{
    const url=  `${this.baseUrl}sell/sellsDay/`;
    return this.http.get<Resp>(url,this.headers).pipe(
      delay(1100),
      catchError(err=>{
        console.log(err);
        return of(err.error)
      }
      )
    );
  }
  
}
