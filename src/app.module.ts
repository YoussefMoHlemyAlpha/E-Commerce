import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { NestModule } from "@nestjs/common";
import { logger } from "./common/middlewares/logger.middleware";
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:"config/.env.dev"
}),AuthModule, 
MongooseModule.forRoot(process.env.DB_Url as string, {
  onConnectionCreate: (connection) => {
    connection.on('connected', () => console.log('connected'));
    connection.on('open', () => console.log('open'));
    connection.on('disconnected', () => console.log('disconnected'));
    connection.on('reconnected', () => console.log('reconnected'));
    connection.on('disconnecting', () => console.log('disconnecting'));

    return connection;
  },
}), BrandModule, CategoryModule, ProductModule],
})
export class AppModule implements NestModule{
 configure(consumer: MiddlewareConsumer) {
   consumer
     .apply(logger)
     .forRoutes('/auth/login');
 }
}
