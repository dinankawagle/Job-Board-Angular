import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { Jobs } from '../../models/jobs';

@Component({
  selector: 'app-find-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './find-job.component.html',
  styleUrl: './find-job.component.scss'
})
export class FindJobComponent implements OnInit{
  id:number;
  job:Jobs;
  
  constructor(private jobsService:JobsService, private route:ActivatedRoute){}
  ngOnInit(): void {

    this.id=parseInt(this.route.snapshot.paramMap.get("id"));  
    if(this.id)
    {
      this.getOneJob();
    }
  }

  getOneJob():void{
    this.jobsService.find(this.id).subscribe((job:Jobs)=>{
      console.log(job);
      this.job=job;
    })
  }

}
