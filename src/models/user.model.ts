import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { signUpDTO } from "src/auth/auth-DTO/auth.dto";

@Schema({
    timestamps:true
})

export class User{

    @Virtual({
        get:function(this:signUpDTO){
            return `${this.firstName} ${this.lastName}`
        },
        set:function(value){
            const firstName=value.split(' ')[0]
            const lastName=value.split(' ')[1]
            this.set({firstName,lastName})
        }
    })
    userName:String
    @Prop({
        type:String,
        required:true,
        max:50,
        min:3
    })
    firstName:string

    @Prop({
        type:String,
        required:true,
        max:30,
        min:3
    })
    lastName:string

    @Prop({
        type:String,
        required:true,
        unique:true,
    })
    email:string

        @Prop({
        type:String,
        required:true,
         min:3,
         max:20
    })
    Password:string

        @Prop({
        type:String,
        required:true,
         min:3,
         max:20
    })
    confirmPassword:string
}

export const userSchema=SchemaFactory.createForClass(User);


