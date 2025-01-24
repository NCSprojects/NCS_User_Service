import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // // UserService에서 AuthService로의 gRPC 클라이언트 연결
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'auth', // AuthService의 proto 패키지명
  //     protoPath: join(__dirname, './proto/auth.proto'),
  //     url: 'localhost:50052', // AuthService의 gRPC 서버 주소
  //   },
  // });

  // UserService의 gRPC 서버
  console.log('Proto path:', join(__dirname, './proto/user.proto'));
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, './proto/user.proto'),
      url: '0.0.0.0:50053', // UserService의 gRPC 서버 주소
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
