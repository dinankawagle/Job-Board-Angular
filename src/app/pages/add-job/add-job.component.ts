import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { Jobs } from '../../models/jobs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink,CommonModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss'
})
export class AddJobComponent implements OnInit{
  addJobsForm: FormGroup;
  id:number;
  
  constructor(private formBuilder:FormBuilder, private jobService:JobsService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.addJobsForm=this.formBuilder.group({
        title:['', Validators.required],
        type:['', Validators.required],
        level:['', Validators.required],
        city:['', Validators.required],
        country:['', Validators.required],
        description:['', Validators.required],
        responsibility:['', Validators.required],
        qualification:['', Validators.required],
        prefered_Qualification:[''],
        min_salary:['',[Validators.required,Validators.min(0)]],
        max_salary:['',[Validators.required,Validators.min(0)]],
        benefits:['']
      })

      this.id=parseInt(this.route.snapshot.paramMap.get("id"));
      if(this.id)
      {
        this.jobService.find(this.id).subscribe((jobsFromDatabase:Jobs)=>{
          this.addJobsForm.patchValue(jobsFromDatabase);
        })
      }
  }

  addJobs():void{
    const job=this.addJobsForm.value;
    if(this.id)
    {
      this.jobService.updateJob(this.id,job).subscribe((result:string)=>{
        if(result==="This job is updated")
        {
          alert("Updated Sucessfully");
          this.router.navigate(['jobs']);
        }
        else
        {
          alert("Error while updating");
        }
      })
    }
    else{
      this.jobService.save(job).subscribe((jobs:Jobs)=>{
        if (jobs.id)
        {
          alert("Job added Successfully");
          this.router.navigate(['jobs']);
        }
        else
        {
          alert("Error while add Job");
        }
      })
    }
  }


}
