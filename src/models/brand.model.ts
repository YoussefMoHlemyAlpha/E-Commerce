import { MongooseModule, Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "./user.model";
import {SchemaFactory} from "@nestjs/mongoose"
import slugify from "slugify";



@Schema({
    timestamps:true
})

export class Brand{
    @Prop({
        type:String,
        unique:true,
        required:true,
        set:function(value:string){
           this.set({slug:slugify(value)})
           return value

        }
    })
    name:string
        @Prop({
        type:String,
        unique:true,
        required:true,

    })
    slug:string
    @Prop({
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User.name
    })
    createdBy:Types.ObjectId
        @Prop({
        type:String,
        required:true
    })
    image:string


}


const BrandSchema=SchemaFactory.createForClass(Brand)

BrandSchema.pre('save',function(next){

    next()
})



export const BrandModel=MongooseModule.forFeature([
    {
        name:Brand.name,
        schema:BrandSchema
    }
])