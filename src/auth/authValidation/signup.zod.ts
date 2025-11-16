import z from "zod";


export const signUpSchema=z.strictObject({
        userName:z.string().min(3).max(50),
        email:z.email(),
        Password:z.string(),
        confirmPassword:z.string(),
}).superRefine((args,ctx)=>{
    if(args.Password!==args.confirmPassword){
        ctx.addIssue({code:"custom",message:"Incorrect Password"})
    }
})