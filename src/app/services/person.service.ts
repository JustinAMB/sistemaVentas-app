import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../interfaces/person';
import { Resp } from '../interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

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


  addPerson(kind:number,person:Person):Observable<Resp>{
    const url=`${this.baseUrl}person/${kind}`;
    return this.http.post<Resp>(url,{...person},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }
  editPerson(id:number,person:Person):Observable<Resp>{
    const url=`${this.baseUrl}person/${id}`;
    return this.http.put<Resp>(url,{...person},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }
  
  getPerson(id:number):Observable<Resp>{
    const url=`${this.baseUrl}person/${id}`;
    return this.http.get<Resp>(url,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  
    );
  }
  getPersons(kind:number,state:boolean=true):Observable<Resp>{
    const url=`${this.baseUrl}person/getPersons/${kind}?state=${state}`;
    return this.http.get<Resp>(url,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1000)
    );
  }

  activePerson(id:number,state:boolean):Observable<Resp> {
    const url=`${this.baseUrl}person/active/${id}`; 
    return this.http.put<Resp>(url,{state},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }
}
