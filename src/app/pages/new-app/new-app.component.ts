import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { JobsService } from '../../services/jobs.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Jobs } from '../../models/jobs';

@Component({
  selector: 'app-new-app',
  standalone: true,
  imports: [CommonModule,RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './new-app.component.html',
  styleUrl: './new-app.component.scss'
})
export class NewAppComponent implements OnInit{

  applicationForm:FormGroup;
  uid:number;
  jobs:Jobs[]=[];
  constructor(private appService:ApplicationService,private jobsService:JobsService,private route:ActivatedRoute,private router:Router, private formBuilder:FormBuilder){}

  ngOnInit(): void {
    
      this.getAllJobs();
      this.uid=parseInt(this.route.snapshot.paramMap.get("id"));

      this.applicationForm=this.formBuilder.group({
        status:['Submitted'],
        jobs:this.formBuilder.group({id:['']}),
        applicant:this.formBuilder.group({id:[this.uid]})
      })
  }

  getAllJobs():void{
    this.jobsService.allJobs().subscribe((jobs:Jobs[])=>{
      console.log(jobs);
      this.jobs=jobs;
    })
  }

  apply(jid:number):void{
    const app = this.applicationForm.value;
    app.jobs.id = jid;
    this.appService.addApplication(app).subscribe((result:string)=>{
      if(result==="Save Successful")
      {
        alert('Application Submitted')
        this.router.navigate(["find".concat("/"+this.uid)]);
      }
      else{
        alert("Error while applying")
      }
    })
  }
}
