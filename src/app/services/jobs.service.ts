import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jobs } from '../models/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  api:string="http://localhost:8080/jobs";

  httpOptions={
    headers:({
      'Content-Type':'application/json'
    })
  }

  constructor(private http:HttpClient){}
  
  save(jobs:Jobs):Observable<Jobs> {
    return this.http.post<Jobs>(this.api.concat("/new"),jobs,this.httpOptions)
   }

  allJobs():Observable<Jobs[]>{
    return this.http.get<Jobs[]>(this.api,this.httpOptions);
  }

  find(id:number):Observable<Jobs>{
    return this.http.get<Jobs>(this.api.concat("/find/"+id));
  }

  delete(id:number):Observable<string>{
    return this.http.delete<string>(this.api.concat("/delete/"+id),{responseType:'text' as 'json'})
  }

  updateJob(id:number, jobs:Jobs):Observable<string>{
    return this.http.put<string>(this.api.concat("/edit/"+id),jobs,{responseType:'text' as 'json'})
  }

  editAvailable(id:number, s:string):Observable<string>{
    return this.http.patch<string>(this.api.concat("/available/"+id+"/"+s),s,{responseType:'text' as 'json'})
  }
}
