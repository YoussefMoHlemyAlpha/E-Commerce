import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User,userSchema} from "src/models/user.model";


@Module({
    imports:[MongooseModule.forFeature([{name:User.name,schema:userSchema}])], 
    providers:[AuthService],
    controllers:[AuthController]
})

export class AuthModule{}

