import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Resp } from '../interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

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
  getReports():Observable<Resp>{
    const url=  `${this.baseUrl}reports/`;
    return this.http.get<Resp>(url,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      }));
  }
}
