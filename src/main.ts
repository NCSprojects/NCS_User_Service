import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, './user.proto'),
    },
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
