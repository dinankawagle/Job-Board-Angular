import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Education } from '../models/education';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api:String="http://localhost:8080/applicant";
  httpOptions ={
    headers: new HttpHeaders({
      'Content-type':'application/json'
    })
  }
  constructor(private http:HttpClient) { }

  login(user:User):Observable<User>{
    return this.http.post<User>(this.api.concat('/login'),user,this.httpOptions)
  }

  signup(user:User):Observable<User>{
    return this.http.post<User>(this.api.concat("/new"),user,this.httpOptions)
  }

  getAllApplicant(id:number):Observable<User>{
    return this.http.get<User>(this.api.concat("/find/"+id))
  }

  updateProfile(id:number,user:User):Observable<string>{
    return this.http.patch<string>(this.api.concat("/edit/"+id), user, {responseType:'text' as 'json'})
  }

  updateEducation(id:number, edu:Education):Observable<string>{
    return this.http.put<string>(this.api.concat("/education/"+id),edu,{responseType:'text' as 'json'})
  }

  updateExperience(id:number, exp:Experience):Observable<string>{
    return this.http.put<string>(this.api.concat("/experience/"+id),exp,{responseType:'text' as 'json'})
  }

  getEducation(id:number):Observable<Education>{
    return this.http.get<Education>(this.api.concat("/find/edu/"+id))
  }
  
  getExperience(id:number):Observable<Experience>{
    return this.http.get<Experience>(this.api.concat("/find/exp/"+id))
  }

  deleteEducation(id:number):Observable<string>{
    return this.http.delete<string>(this.api.concat("/delete/edu/"+id),{responseType:'text' as 'json'});
  }

  deleteExperience(id:number):Observable<string>{
    return this.http.delete<string>(this.api.concat("/delete/exp/"+id),{responseType:'text' as 'json'});
  }

  allApplicants():Observable<string[]>{
    return this.http.get<string[]>(this.api.concat("/username"),this.httpOptions);
  }
}
