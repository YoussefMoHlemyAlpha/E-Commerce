import { Body, Controller, Get, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ZodValidation } from "src/common/pipes/zod.pip";
import { loginSchema, signUpSchema } from "./authValidation/signup.zod";
import { checkPassword } from "src/common/pipes/auth.pipe";
import type{ loginDTO, signUpDTO } from "./auth-DTO/auth.dto";

@Controller('/auth')
export class AuthController{
constructor(private readonly authService:AuthService){}

  @Post('/signup')
  @UsePipes(new ZodValidation(signUpSchema),new checkPassword())
  async signup(@Body() data:signUpDTO){
   return await this.authService.signup(data)
  }
  
 @Post('/login')
  @UsePipes(new ZodValidation(loginSchema))
  async login(@Body() data:loginDTO){
   return await this.authService.login(data)
  }


}

