import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User,userSchema} from "src/models/user.model";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "src/models/user.model";

@Module({
    imports:[UserModel], 
    providers:[AuthService,JwtService],
    controllers:[AuthController]
})

export class AuthModule{}

