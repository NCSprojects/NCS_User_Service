import { Controller, Inject, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserInterface } from '../../dto/create-user-grpc.dto';
import { UserDto } from '../../dto/create-user.dto';
import { UserRegisterUseCase } from '../../application/port/in/user.registerUseCase';
import { UserMapper } from '../../mapper/user.mapper';
import { User } from 'src/user/domain/user';
import { UserNotificationUseCase } from 'src/user/application/port/in/user.notificationUseCase';

@Controller()
export class UserGrpcController {
  private readonly logger = new Logger(UserGrpcController.name);
  constructor(
    @Inject('RegisterUsecase')
    private readonly userRegisterUseCase: UserRegisterUseCase,
    @Inject('NotificationUsecase')
    private readonly userNotificationUseCase: UserNotificationUseCase,
    private readonly userMapper: UserMapper,
  ) {}
  // User 생성 proto 함수
  @GrpcMethod('UserService', 'CreateUser')
  async createUser(createUserGrpcDto: UserInterface) {
    this.logger.log(
      `Received createUserDto: ${JSON.stringify(createUserGrpcDto)}`,
    );
    const createUserDto: UserDto =
      this.userMapper.toUserDtoFromGrpcDto(createUserGrpcDto);
    const userDto = await this.userRegisterUseCase.saveUserInfo(createUserDto);

    this.logger.log(`userDto: ${JSON.stringify(userDto)}`);

    const userGrpcDto: UserInterface =
      this.userMapper.toUserInterfaceFromUserDto(userDto);

    this.logger.log(`userGrpcDto: ${JSON.stringify(userGrpcDto)}`);
    return userGrpcDto;
  }

  // User 조회 proto 함수
  @GrpcMethod('UserService', 'FindById')
  async findUser({ randomId: id }) {
    const userDto = await this.userRegisterUseCase.findByRandomIdUserInfo(id);

    this.logger.log(`userDto: ${JSON.stringify(userDto)}`);

    const userGrpcDto: UserInterface =
      this.userMapper.toUserInterfaceFromUserDto(userDto);

    this.logger.log(`userGrpcDto: ${JSON.stringify(userGrpcDto)}`);
    return userGrpcDto;
  }

  // UserFCM 조회 proto 함수
  @GrpcMethod('userfcm.UserService', 'GetFcmToken')
  async getFcmToken({ user_id }: { user_id: string }) {
     const fcm_token = await this.userNotificationUseCase.getFcmToken(user_id);
     const safeToken = fcm_token ?? '';
    this.logger.log(`Fetched FCM token for user_id ${user_id}: ${fcm_token}`);
    return { fcm_token : safeToken};
  }
}
