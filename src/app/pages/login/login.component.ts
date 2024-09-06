import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private userService:UserService, private route:Router){}

  ngOnInit(): void {
      this.loginForm=this.formBuilder.group({
        username:['', Validators.required],
        password:['',Validators.required]
      })
  }

  login():void{
    const user=this.loginForm.value;
    this.userService.login(user).subscribe((user:User)=>{
      console.log(user);
      if (user.id){
        this.route.navigate(["find".concat("/"+user.id)]);
      }
      else
      {
        alert("Invalid username or password");
      }
    })
  }

}
