import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { UserRegisterUseCase } from './port/in/user.registerUseCase';
import { UserMapper } from '../mapper/user.mapper';
import { UserEntity } from '../entities/user.entity';
import { User } from '../domain/user';
import { UserSaveUser } from './port/out/user.saveUser';
import { UserLoadUser } from './port/out/user.loadUser';
import * as console from 'node:console';
import { CreateFcmDto } from '../dto/create-fcm-dto';
import { UserFcmToken } from './port/out/user.fcmTokenPort';

@Injectable()
export class UserService implements UserRegisterUseCase {
  private readonly TOKEN_EXPIRY: number = 43200;
  constructor(
    @Inject('UserSaveUser') private readonly userSaveUser: UserSaveUser,
    @Inject('UserLoadUser') private readonly userLoadUser: UserLoadUser,
    @Inject('FcmAdapter') private readonly fcmPort: UserFcmToken,
    private readonly userMapper: UserMapper,
  ) {}

  async saveUserInfo(createUserDto: UserDto): Promise<UserDto> {
    const user: User = this.userMapper.toDomainfromDto(createUserDto);
    const requestUserEntity: UserEntity =
      this.userMapper.toEntityfromDomain(user);
    const userEntity: UserEntity =
      await this.userSaveUser.createUser(requestUserEntity);
    console.log(userEntity);
    return this.userMapper.toDtofromEntity(userEntity);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByRandomIdUserInfo(id: string): Promise<UserDto> {
    const userEntity: UserEntity = await this.userLoadUser.findByRandomId(id);
    return this.userMapper.toDtofromEntity(userEntity);
  }

  async saveUserFcmToken(fcmDto: CreateFcmDto): Promise<boolean> {
    try {
      const result = await this.fcmPort.setFcmToken(
        fcmDto.randomId,
        fcmDto.token,
        this.TOKEN_EXPIRY,
      );
      return result === 'OK';
    } catch (error) {
      console.error('Error saving FCM token:', error);
      return false;
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
