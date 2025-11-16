import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`server is running on port ${process.env.PORT ?? 5000}`);
  
}
bootstrap();
