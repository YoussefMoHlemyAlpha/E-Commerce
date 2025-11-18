import { signUpDTO } from "./auth-DTO/auth.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/models/user.model";
import { loginDTO } from "./auth-DTO/auth.dto";
import { compareHash } from "src/common/utils/hash";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
  constructor(@InjectModel(User.name) private userModel:Model<User>
  ,private JwtService:JwtService){}

  async signup(data:signUpDTO ){
    const IsExist=await this.userModel.findOne({email:data.email})
    if(IsExist){
        throw new BadRequestException("User already exist")
    }
    const user=await this.userModel.create(data)
    console.log({user});
    
   return {user}

  }

  async login(data:loginDTO){
    const{email,Password}=data
    const user=await this.userModel.findOne({email})
    if(!user || !(await compareHash(Password,user.Password))){
        throw new BadRequestException("User not found")
    }
    const accessToken=this.JwtService.sign({id:user._id},{secret:process.env.JWT_SECRET})
    return {data:accessToken}
  }

}


