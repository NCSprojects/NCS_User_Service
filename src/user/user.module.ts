import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './adapter/in.web/user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './adapter/out.persistence/user.repository';
import { UserMapper } from './mapper/user.mapper';
import { UserAdapter } from './adapter/out.persistence/user.userAdapter';
import { UserGrpcController } from './adapter/in.web/user.grpcController';
import { UserNotificationService } from './application/user.notification.service';
import { RedisRepository } from './adapter/out.persistence/user.redis.repository';
import { UserFcmAdapter } from './adapter/out.persistence/user.fcmAdapter';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, UserGrpcController],
  providers: [
    {
      provide: 'RegisterUsecase',
      useClass: UserService,
    },
    {
      provide: 'NotificationUsecase',
      useClass: UserNotificationService,
    },
    {
      provide: 'FcmAdapter',
      useClass: UserFcmAdapter,
    },
    RedisRepository,
    UserRepository,
    UserMapper,
    {
      provide: 'UserSaveUser',
      useClass: UserAdapter,
    },
    {
      provide: 'UserLoadUser',
      useClass: UserAdapter,
    },
  ],
  exports: [],
})
export class UserModule {}
