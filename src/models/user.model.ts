import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { signUpDTO } from "src/auth/auth-DTO/auth.dto";
import { IUser } from "src/types/user.type";
import { Gender,type Iotp,Role,Provider } from "src/types/user.type";
import { createHash } from "src/common/utils/hash";
import { hashSync } from "bcrypt";
@Schema({
    timestamps:true
})

export class User implements IUser {

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
        set:function(value:string){
              return hashSync(value, Number(process.env.SALT_ROUNDS));
        },
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

    @Prop({
        type:String,
        required:true,
         min:3,
         max:20
    })
    phone:string

    @Prop({
        type:Number,
         min:3,
         max:20
    })
    age:number

    @Prop({
        type:String,
        enum:Object.values(Gender),
         min:3,
         max:20
    })
    gender:Gender

    @Prop({
        type:String,
        enum:Object.values(Role),
         min:3,
         max:20
    })
    role:Role

    @Prop({
        type:String,
        enum:Object.values(Provider),
         min:3,
         max:20
    })
    provider:Provider

    @Prop({
        type:Object,
         min:3,
         max:20
    })
    emailOtp:Iotp
}

export const userSchema=SchemaFactory.createForClass(User);

export const UserModel=MongooseModule.forFeature([{name:User.name,schema:userSchema}])
