import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { Jobs } from '../../models/jobs';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss'
})
export class AddJobComponent implements OnInit{
  addJobsForm: FormGroup;
  id:number;
  
  constructor(private formBuilder:FormBuilder, private jobService:JobsService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.addJobsForm=this.formBuilder.group({
        title:[''],
        type:[''],
        level:[''],
        city:[''],
        country:[''],
        description:[''],
        responsibility:[''],
        qualification:[''],
        prefered_Qualification:[''],
        min_salary:[''],
        max_salary:[''],
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
