import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './adapter/in.web/user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './adapter/out.persistence/user.repository';
import { UserMapper } from './mapper/user.mapper';
import { UserAdapter } from './adapter/out.persistence/user.userAdapter';
import { UserGrpcController } from './adapter/in.web/user.grpcController';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, UserGrpcController],
  providers: [
    {
      provide: 'RegisterUsecase',
      useClass: UserService,
    },
    UserRepository,
    UserMapper,
    UserAdapter,
  ],
  exports: [],
})
export class UserModule {}
