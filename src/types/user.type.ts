import { HydratedDocument } from "mongoose"

export interface IUser{

    userName:String
    firstName:string
    lastName:string
    email:string
    Password:string
    confirmPassword:string
    phone:string,
    age:number,
    gender:Gender,
    role:Role,
    provider:Provider
    emailOtp:Iotp

}
export type hydratedUser=HydratedDocument<IUser>

export enum Gender{
    MALE="MALE",
    FEMALE="FEMALE"
}


export enum Role{
    USER="USER",
    ADMIN="ADMIN"
}

export enum Provider{
    SYSTEM="SYSTEM",
    GOOGLE="GOOGLE"
}

export interface Iotp{
email:string,
otp:string
}