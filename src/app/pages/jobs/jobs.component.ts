import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { Jobs } from '../../models/jobs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit{

  jobs:Jobs[]=[];
  availableForm:FormGroup;
  constructor(private jobsService:JobsService, private formBuilder:FormBuilder){}

  ngOnInit(): void {
      this.getAllJobs();
  }

  getAllJobs():void{
    this.jobsService.allJobs().subscribe((jobs:Jobs[])=>{
      this.jobs=jobs;
    })
  }

  removeJob(id:number):void{
    this.jobsService.editAvailable(id,"No").subscribe((result:string)=>{
      this.getAllJobs();
    })
  }

  addJob(id:number):void{
    this.jobsService.editAvailable(id,"Yes").subscribe((result:string)=>{
      this.getAllJobs();
    })
  }
}
