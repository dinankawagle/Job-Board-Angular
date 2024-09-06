import { Address } from "./address";
import { Application } from "./application";
import { Education } from "./education";
import { Experience } from "./experience";

export interface User {
    id:number,
    fullname?:String,
    username:String,
    password:String,
    email:String,
    phone:String,
    skills:String,
    desiredSalary:number,
    address:Address,
    education:Education[];
    experience:Experience[],
    applications:Application[]
}
