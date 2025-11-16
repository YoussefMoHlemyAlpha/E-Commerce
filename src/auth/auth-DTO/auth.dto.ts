import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator"



export class signUpDTO{
    @IsString()
    @Length(3,100)
    userName:string

    @IsEmail()

    email:string
     
    @IsString()
    @Length(3,100)
    firstName:string

    @IsString()
    @Length(3,100)
    lastName:string
    
    @IsString()
    @IsStrongPassword()
    Password:String

    @IsString()
    confirmPassword:String
}