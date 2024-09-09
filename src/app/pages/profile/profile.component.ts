import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  applicant:User;
  application:Application;
  applicationForm:FormGroup;

  aid:number;
  constructor(private userService:UserService, private applicationService:ApplicationService, private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute){};
  ngOnInit(): void {
    this.aid=parseInt(this.route.snapshot.paramMap.get("id"));  
    if(this.aid)
    {
      this.getAllApplication();
    }
    this.applicationForm=this.formBuilder.group({
      status:['Withdrawn']
    })
  }

  getAllApplication():void{
    this.userService.getAllApplicant(this.aid).subscribe((applicant:User)=>{
      console.log(applicant);
      this.applicant=applicant;
    })

  }

  withdrawApplication(applicationID:number):void{
    const app=this.applicationForm.value;
    this.applicationService.changeStatus(applicationID,app).subscribe((result:string)=>{
      if(result==="Success")
      {
        alert("Application Withdrawn");
        this.getAllApplication();
      }
      else{
        alert("Error while Withdrawing");
      }
    })
  }

}
