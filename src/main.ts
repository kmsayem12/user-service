import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVICE_PORT);
  console.log(
    `🚀 Server ready at http://localhost:${process.env.SERVICE_PORT}`,
  );
  console.log(`tag: ${process.env.TAG}`);
}
bootstrap();
