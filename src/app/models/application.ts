import { Jobs } from "./jobs";
import { User } from "./user";

export interface Application {
    id:number,
    status:string,
    submitted: Date,
    jobs:Jobs,
    applicant:User
}
