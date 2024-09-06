import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit{

  apps:Application[]=[];
  constructor(private applicationService:ApplicationService, private router:Router){}
  ngOnInit(): void {
      this.getAllApplications();
  }

  getAllApplications():void{
    this.applicationService.getApplications().subscribe((apps:Application[])=>{
      console.log(apps);
      this.apps=apps;
    })
  }

}
