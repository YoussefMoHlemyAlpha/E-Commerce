import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Request } from "express";
import { Observable } from "rxjs";
import { User } from "src/models/user.model";
import { Model } from "mongoose";
import { hydratedUser } from "src/types/user.type";



export interface AuthRequest extends Request{
    user:hydratedUser
}
export class AuthGards implements CanActivate{

    constructor(private jwtService:JwtService
        ,@InjectModel(User.name) private userModel:Model<User>
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const req:AuthRequest=context.switchToHttp().getRequest()
        const {authorization}=req.headers
        if(!authorization || !authorization?.startsWith("Bearer")){
            throw new BadRequestException("invalid token")
        }
        const token=authorization.split(" ")[1]
        const payload=await this.jwtService.verify(token,{secret:(process.env.JWT_SECRET as string)})
        const user=await this.userModel.findById(payload.id)
        if(!user){
            throw new BadRequestException("User not found")
        }
        req.user=user
        
        return true
        
    }
}