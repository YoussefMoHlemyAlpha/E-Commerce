import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { signUpDTO } from "src/auth/auth-DTO/auth.dto";


export class checkPassword implements PipeTransform{
    transform(value: signUpDTO, metadata: ArgumentMetadata) {
        console.log(value.Password,value.confirmPassword);
        
       if(value.Password!=value.confirmPassword){
        throw new BadRequestException("incorrect Password")
       }
       return value
       
    }
}