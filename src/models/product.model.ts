import { MongooseModule, Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "./user.model";
import {SchemaFactory} from "@nestjs/mongoose"
import slugify from "slugify";
import { Type } from "@nestjs/common";
import { Category } from "./category.model";
import { Brand } from "./brand.model";


@Schema({
    timestamps:true
})

export class Product{
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
        type:String,
        required:true,

    })
    description:string

    @Prop({
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User.name
    })
    createdBy:Types.ObjectId
        @Prop({
        type:[String],
        required:true
    })
    images:string[]
    
    @Prop({
        type:Number,
        required:true
    })
    originalPrice:number
        @Prop({
        type:Number,
        required:true,
        default:0
    })
    discount:number
    

    @Prop({
        type:Number,
        required:true
    })
    salePrice:number
    

    @Prop({
        type:Number,
        required:true,
        default:0
    })
    stock:number


    @Prop({
        type:Number,
        required:true,
        default:0
    })
    soldItems:number

    @Prop({
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:Category.name
    })
    category:Types.ObjectId
        @Prop({
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:Brand.name
    })
    brand:Types.ObjectId




}


const ProductSchema=SchemaFactory.createForClass(Product)

ProductSchema.pre('save',function(next){

    next()
})



export const ProductModel=MongooseModule.forFeature([
    {
        name:Product.name,
        schema:ProductSchema
    }
])