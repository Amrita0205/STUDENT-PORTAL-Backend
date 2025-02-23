import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });
  
  await app.listen(3000);
}

bootstrap();