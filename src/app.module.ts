import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { typeORMConfig } from '../typeorm.config';
import { eurekaClient } from '../eureka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // 환경 변수 파일 경로 지정
    }),
    UserModule,
    TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정을 여기서 사용
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  // 애플리케이션이 시작될 때 Eureka에 등록
  async onModuleInit() {
    eurekaClient.start((error) => {
      if (error) {
        console.error('Eureka Client registration failed:', error);
      } else {
        console.log('Eureka Client registration succeeded!');
      }
    });
  }

  async onModuleDestroy() {
    eurekaClient.stop();
    console.log('Eureka Client deregistered successfully');
  }
}
