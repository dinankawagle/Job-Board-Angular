import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,RouterLink,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  
  signupForm:FormGroup;
  id:number;
  users:User[]=[];
  constructor(private userService: UserService, private formBuilder:FormBuilder, private route:Router, private activeRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      fullname:['',Validators.required],
      username:['',Validators.required],
      password:['',[Validators.minLength(8),Validators.maxLength(24),Validators.required]],
      email:['', [Validators.required, Validators.email]],
      phone:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      skills:[''],
      desiredSalary:['',[Validators.required,Validators.min(0)]],
      address:this.formBuilder.group({
        street:['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        country:['',Validators.required],
        zip_code:['',Validators.required]
      }),
      education:this.formBuilder.array([]),
      experience:this.formBuilder.array([])
    })

    this.id=parseInt(this.activeRoute.snapshot.paramMap.get("id"));
    this.getEveryUser();
    if(this.id)
    {
      this.userService.getAllApplicant(this.id).subscribe((userFromDatabase:User)=>{
        console.log(userFromDatabase);
        this.signupForm.patchValue(userFromDatabase);
      })
    }
  }

  getEveryUser():void{
    this.userService.allApplicants().subscribe((users:User[])=>{
      this.users=users;
    })
  }

  get education(): FormArray {
    return this.signupForm.get('education') as FormArray;
  }

  addEducation():void{
    const educationGroup = this.formBuilder.group({
      degree:[''],
      major:[''],
      minor:[''],
      gpa:[''],
      schoolName:['']
    });
    this.education.push(educationGroup);
  }

  removeEducation(index: number): void {
    this.education.removeAt(index);
  }

  get experience(): FormArray {
    return this.signupForm.get('experience') as FormArray;
  }

  addExperience():void{
    const experienceGroup = this.formBuilder.group({
      job_title:[''],
      company_name:[''],
      started:[''],
      ended:[''],
      still_there:[''],
      responsibilities:['']
    });
    this.experience.push(experienceGroup);
  }

  removeExperience(index: number): void {
    this.experience.removeAt(index);
  }


  signup():void{
    const user = this.signupForm.value;
    console.log(user);
    if(this.id)
    {
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
    else{
      this.userService.signup(user).subscribe((user:User)=>{
        if(user.id)
        {
          this.route.navigate(['/login']);
        }
        else
        {
          alert("Error while signing up")
        }
      })
    }
  }

}
