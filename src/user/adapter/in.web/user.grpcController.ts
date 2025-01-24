import { Controller, Inject, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserInterface } from '../../dto/create-user-grpc.dto';
import { UserDto } from '../../dto/create-user.dto';
import { UserRegisterUseCase } from '../../application/port/in/user.findUseCase';

@Controller()
export class UserGrpcController {
  private readonly logger = new Logger(UserGrpcController.name);
  constructor(
    @Inject('RegisterUsecase')
    private readonly userRegisterUseCase: UserRegisterUseCase,
  ) {}
  @GrpcMethod('UserService', 'CreateUser')
  async createUser(createUserGrpcDto: UserInterface) {
    this.logger.log(
      `Received createUserDto: ${JSON.stringify(createUserGrpcDto)}`,
    );
    const createUserDto: UserDto = new UserDto();
    createUserDto.id = createUserGrpcDto.randomId;
    createUserDto.adCnt = createUserGrpcDto.adCnt;
    createUserDto.cdCnt = createUserGrpcDto.cdCnt;
    createUserDto.preRev = createUserGrpcDto.preRev;
    createUserDto.regDt = new Date(createUserGrpcDto.regDt);
    const userDto = await this.userRegisterUseCase.saveUserInfo(createUserDto);
    this.logger.log(`userDto: ${JSON.stringify(userDto)}`);
    const userGrpcDto: UserInterface = new UserInterface();
    userGrpcDto.randomId = userDto.id;
    userGrpcDto.adCnt = userDto.adCnt;
    userGrpcDto.cdCnt = userDto.cdCnt;
    userGrpcDto.preRev = userDto.preRev;
    userGrpcDto.regDt = new Date(userDto.regDt).toISOString();
    this.logger.log(`userGrpcDto: ${JSON.stringify(userGrpcDto)}`);
    return userGrpcDto;
  }
  @GrpcMethod('UserService', 'FindById')
  async findUser({ randomId: id }) {
    const userDto = await this.userRegisterUseCase.findByRandomIdUserInfo(id);
    this.logger.log(`userDto: ${JSON.stringify(userDto)}`);
    const userGrpcDto: UserInterface = new UserInterface();
    userGrpcDto.randomId = userDto.id;
    userGrpcDto.adCnt = userDto.adCnt;
    userGrpcDto.cdCnt = userDto.cdCnt;
    userGrpcDto.preRev = userDto.preRev;
    userGrpcDto.regDt = new Date(userDto.regDt).toISOString();
    this.logger.log(`userGrpcDto: ${JSON.stringify(userGrpcDto)}`);
    return userGrpcDto;
  }
}
