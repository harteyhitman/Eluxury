import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(DatabaseModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();