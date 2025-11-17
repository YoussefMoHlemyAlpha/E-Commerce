import { Injectable } from "@nestjs/common";
import { User } from "./models/user.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { signUpDTO } from "./auth/auth-DTO/auth.dto";
@Injectable()
export class AppService {

}
