import { Application } from "./application";

export interface Jobs {
    id:number,
    title:string,
    type:string,
    level:string,
    city:string,
    country:string,
    posted:Date,
    updated:Date,
    description:String,
    responsibility:string,
    qualification:string,
    prefered_Qualification:string,
    min_salary:number,
    max_salary:number,
    benefits:string,
    available:string,
    applications:Application[]
}
