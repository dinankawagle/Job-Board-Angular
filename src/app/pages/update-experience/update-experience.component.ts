import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-update-experience',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './update-experience.component.html',
  styleUrl: './update-experience.component.scss'
})
export class UpdateExperienceComponent implements OnInit{
  signupForm:FormGroup;
  id:number;
  aid:number;
  constructor(private userService: UserService, private formBuilder:FormBuilder, private route:Router, private activeRoute:ActivatedRoute){}

  ngOnInit(): void {
      this.signupForm=this.formBuilder.group({
        job_title:[''],
        company_name:[''],
        started:[''],
        ended:[''],
        still_there:[''],
        responsibilities:['']
      })

      this.aid=parseInt(this.activeRoute.snapshot.paramMap.get("aid"))
      this.id=parseInt(this.activeRoute.snapshot.paramMap.get("id"));


    if(this.id)
    {
      this.userService.getExperience(this.id).subscribe((experienceFromDatabse:Experience)=>{
        console.log(experienceFromDatabse);
        this.signupForm.patchValue(experienceFromDatabse);
      })
    }
  }

  

  submit():void{
    const exp=this.signupForm.value;
    this.userService.updateExperience(this.id,exp).subscribe((result:string)=>{
      if (result==="Success")
        {
          alert("Update Successful!!");
          this.route.navigate(['/find'.concat("/"+this.aid)]);
        }
        else{
          alert("Error while updating experience")
        }
    })
  }

  delete():void{
    this.userService.deleteExperience(this.id).subscribe((result:string)=>{
      if (result==="Success")
        {
          alert("Delete Successful!!");
          this.route.navigate(['/find'.concat("/"+this.aid)]);
        }
        else{
          alert("Error while deleting experience")
        }
    })
  }
}
