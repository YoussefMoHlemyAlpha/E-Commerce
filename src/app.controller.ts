import { Controller,Post,Body, UsePipes} from "@nestjs/common";
import { AppService } from "./app.service";
import type{ signUpDTO } from "./auth/auth-DTO/auth.dto";
import { ZodValidation} from "./common/pipes/zod.pip";
import { signUpSchema } from "./auth/authValidation/signup.zod";
import { checkPassword } from "./common/pipes/auth.pipe";

@Controller('/auth')
export class AppController {
  constructor(private readonly appService: AppService) {}




}
