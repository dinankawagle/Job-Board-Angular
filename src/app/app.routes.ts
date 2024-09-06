import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { ApplicationComponent } from './pages/application/application.component';
import { NewAppComponent } from './pages/new-app/new-app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FindJobComponent } from './pages/find-job/find-job.component';
import { UpdateEducationComponent } from './pages/update-education/update-education.component';
import { UpdateExperienceComponent } from './pages/update-experience/update-experience.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';

export const routes: Routes = [
    {path:"login", component:LoginComponent},
    {path:"", component:LoginComponent},
    {path:"signup", component:SignupComponent},
    {path:"update/profile/:id", component:SignupComponent},
    {path:"find/:id", component:ProfileComponent},
    {path:"jobs", component:JobsComponent},
    {path:"jobs/add",component:AddJobComponent},
    {path:"app", component:ApplicationComponent},
    {path:"app/new/:id", component:NewAppComponent},
    {path:"app/delete/:id", component:NewAppComponent},
    {path:"update/job/:id", component:AddJobComponent},
    {path:"find/job/:id", component:FindJobComponent},
    {path:"find/job", component:FindJobComponent},
    {path:"update/edu/:aid/:id", component:UpdateEducationComponent},
    {path:"update/exp/:aid/:id", component:UpdateExperienceComponent}
];
