import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from 'zod';


export class ZodValidation implements PipeTransform{
    constructor(private schema: ZodSchema){ }
    transform(value: any, metadata: ArgumentMetadata) {
        const result= this.schema.safeParse(value)
        if(!result.success){
            throw new BadRequestException(result.error.issues)
        }
        return value
    }
}