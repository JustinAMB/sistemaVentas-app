import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resp } from '../interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

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

  upload(file:File,type:string):Observable<Resp> {
    const url=`${this.baseUrl}upload/${type}`; 
    const formData=new FormData();
    formData.append('image',file);
    return this.http.post<Resp>(url,formData,this.headers);

  }
}
