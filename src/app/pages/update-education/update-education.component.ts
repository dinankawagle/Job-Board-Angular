import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Education } from '../../models/education';

@Component({
  selector: 'app-update-education',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './update-education.component.html',
  styleUrl: './update-education.component.scss'
})
export class UpdateEducationComponent implements OnInit {
  signupForm:FormGroup;
  id:number;
  aid:number;
  constructor(private userService: UserService, private formBuilder:FormBuilder, private route:Router, private activeRoute:ActivatedRoute){}
  
  ngOnInit(): void {
      this.signupForm=this.formBuilder.group({
        degree:[''],
        major:[''],
        minor:[''],
        gpa:[''],
        schoolName:['']
      })

      this.aid=parseInt(this.activeRoute.snapshot.paramMap.get("aid"))
      this.id=parseInt(this.activeRoute.snapshot.paramMap.get("id"));


    if(this.id)
    {
      this.userService.getEducation(this.id).subscribe((educationFromDatabase:Education)=>{
        console.log(educationFromDatabase);
        this.signupForm.patchValue(educationFromDatabase);
      })
    }
  }

  submit():void{
    const edu=this.signupForm.value;
    this.userService.updateEducation(this.id,edu).subscribe((result:string)=>{
      if (result==="Success")
        {
          alert("Update Successful!!");
          this.route.navigate(['/find'.concat("/"+this.aid)]);
        }
        else{
          alert("Error while updating education")
        }
    })
  }

  delete():void{
    this.userService.deleteEducation(this.id).subscribe((result:string)=>{
      if (result==="Success")
        {
          alert("Delete Successful!!");
          this.route.navigate(['/find'.concat("/"+this.aid)]);
        }
        else{
          alert("Error while deleting education")
        }
    })
  }
}
