
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/models/user.model";
import { signUpDTO } from "./auth-DTO/auth.dto";

@Injectable()
export class AuthService{
constructor(@InjectModel(User.name) private userModel:Model<User>){}
 async sayhello(body:signUpDTO): Promise<String> {
    const data=await this.userModel.create(body)
    console.log(data);
    
	return Promise.resolve("Hello, World!");
 }
}


