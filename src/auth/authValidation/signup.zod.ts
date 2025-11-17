import z from "zod";
import { Gender,Role,Provider } from "src/types/user.type";

export const signUpSchema=z.strictObject({

        userName:z.string().min(3).max(50),
        email:z.email(),
        Password:z.string(),
        confirmPassword:z.string(),
        age:z.number().optional(),
        phone:z.string().optional(),
        gender:z.enum(Object.values(Gender)).default(Gender.MALE).optional(),
        role:z.enum(Object.values(Role)).default(Role.USER).optional(),
        provider:z.enum(Object.values(Provider)).default(Provider.SYSTEM).optional()

}).superRefine((args,ctx)=>{
    if(args.Password!==args.confirmPassword){
        ctx.addIssue({code:"custom",message:"Incorrect Password"})
    }
})

export const loginSchema=z.strictObject({
    email:z.email(),
    Password:z.string()
})