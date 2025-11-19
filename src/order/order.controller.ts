import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGards } from 'src/common/guards/auth.guards';
import type{ AuthRequest } from 'src/common/guards/auth.guards';
@Controller('order')
export class OrderController {
constructor(private readonly orderService:OrderService){}


@Post('/create-order')
@UseGuards(AuthGards)    
async createOrder(@Req() req:AuthRequest ){
    const userId=req.user._id
    const {discount,instructions,address,phone,paymentMethod}=req.body
    return await this.orderService.createOrder({userId,discount,instructions,address,phone,paymentMethod})

}
}