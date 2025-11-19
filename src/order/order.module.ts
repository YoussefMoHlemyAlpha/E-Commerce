import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderModel } from 'src/models/order.model';
import { CartModel } from 'src/models/cart.model';
import { UserModel } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { ProductModel } from 'src/models/product.model';

@Module({
  imports:[OrderModel,CartModel,UserModel,ProductModel],
  controllers: [OrderController],
  providers: [OrderService,JwtService]
})
export class OrderModule {}
