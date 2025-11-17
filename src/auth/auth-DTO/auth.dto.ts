import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator"
import {z} from "zod"
import { loginSchema, signUpSchema } from "../authValidation/signup.zod"

export type signUpDTO=z.infer<typeof signUpSchema> &{firstName:string,lastName:string}

export type loginDTO=z.infer<typeof loginSchema>



