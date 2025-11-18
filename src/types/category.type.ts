



import { HydratedDocument, Types } from "mongoose"

export interface ICategory{
    name:string
    slug:string
    createdBy:Types.ObjectId
    image:string
    brands:Types.ObjectId[]
}

export type HydratedCategory=HydratedDocument<ICategory>