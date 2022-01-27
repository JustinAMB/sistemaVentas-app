import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resp } from '../interfaces/resp';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
  getUsers(status:boolean):Observable<Resp>{
    const url=  `${this.baseUrl}user/?is_active=${status}`;
    return this.http.get<Resp>(url,this.headers);
  }
  getUser(id:number):Observable<Resp>{
    const url=  `${this.baseUrl}user/${id}`;
    return this.http.get<Resp>(url,this.headers);
  }
  addUser(user:User):Observable<Resp>{
    const url=  `${this.baseUrl}user/`;
    return this.http.post<Resp>(url,{...user},this.headers);
  }
  editUser(user:User):Observable<Resp>{
    const url=  `${this.baseUrl}user/${user.id}`;
    return this.http.put<Resp>(url,{...user},this.headers);
  }

  /*******************************
   * /active/:id
   */

  activeUser(id:number,status:boolean):Observable<Resp>{
    const url=  `${this.baseUrl}user/active/${id}?status=${status}`;
    return this.http.put<Resp>(url,{},this.headers);

  }
}
