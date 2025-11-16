import { Body, Controller, Get, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signUpDTO } from "./auth-DTO/auth.dto";
import { ZodValidation } from "src/common/pipes/zod.pip";
import { signUpSchema } from "./authValidation/signup.zod";

@Controller('/auth')
export class AuthController{
constructor(private readonly authService:AuthService){}
@Post('/')
@UsePipes(new ZodValidation(signUpSchema))
async sayHello(@Body()body:signUpDTO):Promise<any>{
   
    await this.authService.sayhello(body);
    return {body}
   
}

}

