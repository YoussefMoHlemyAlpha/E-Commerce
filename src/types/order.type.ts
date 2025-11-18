import { HydratedDocument, Types } from "mongoose";

export interface IOrder{

    user:Types.ObjectId,
    items:Array<{product:Types.ObjectId,quantity:number}>
    subtotal:number,
    discount:number,
    total:number
    address:string
    instructions:string[],
    phone:string,
    paymentMethod:PaymentMethod,
    orderStatus:OrderStatus

}


export enum PaymentMethod{
    CASH="CASH",
    VISA="VISA"
}

export enum OrderStatus{
    PENDING="PENDING",
    PROCESSING="PROCESSING",
    SHIPPED="SHIPPED",
    DELIVERED="DELIVERED",
    CANCELLED="CANCELLED"
}

export type HOrder=HydratedDocument<IOrder>