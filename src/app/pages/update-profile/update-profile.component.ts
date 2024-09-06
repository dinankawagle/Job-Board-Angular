import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  signupForm:FormGroup;
  id:number;
  constructor(private userService: UserService, private formBuilder:FormBuilder, private route:Router, private activeRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      fullname:[''],
      username:[''],
      password:[''],
      email:[''],
      phone:[''],
      skills:[''],
      desiredSalary:[''],
      address:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zip_code:['']
      }),
      education:this.formBuilder.array([]),
      experience:this.formBuilder.array([])
    })

    this.id=parseInt(this.activeRoute.snapshot.paramMap.get("id"));
    if(this.id)
    {
      this.userService.getAllApplicant(this.id).subscribe((userFromDatabase:User)=>{
        console.log(userFromDatabase);
        this.signupForm.patchValue(userFromDatabase);
      })
    }
  }


  signup():void{
    const user = this.signupForm.value;
    console.log(user);
    
      this.userService.updateProfile(this.id,user).subscribe((result:string)=>{
        if (result==="Success")
        {
          alert("Update Successful!!");
          this.route.navigate(['/find'.concat("/"+this.id)]);
        }
        else{
          alert("Error while updating profile")
        }
      })
    
  }

}

