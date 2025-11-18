import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AuthInterceptor } from "./interceptors/logger.interceptor";

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AuthInterceptor());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`server is running on port ${process.env.PORT ?? 5000}`);
  
} 
bootstrap();
