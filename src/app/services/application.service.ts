import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  api:string="http://localhost:8080/application";

  httpOptions:{
    headers:({
      'Content-Type':'application/json';
    })
  }
  constructor(private http:HttpClient) { }

  addApplication(application:Application):Observable<string>
  {
    return this.http.post<string>(this.api.concat("/new"),application, {responseType: 'text' as 'json'})
  }

  changeStatus(id:number,application:Application):Observable<string>
  {
    return this.http.patch<string>(this.api.concat("/status/"+id),application, {responseType:'text'as'json'})
  }

  getApplications():Observable<Application[]>{
    return this.http.get<Application[]>(this.api);
  }
}
