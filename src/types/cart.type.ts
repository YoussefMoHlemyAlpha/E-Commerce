import { HydratedDocument, Types } from "mongoose";
import { int } from "zod";


export interface ICart {
    user:Types.ObjectId;
    items:Array<{product:Types.ObjectId,quantity:number}>;

}


export type HCart=HydratedDocument<ICart>;