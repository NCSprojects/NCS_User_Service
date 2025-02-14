import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { UserRegisterUseCase } from './port/in/user.findUseCase';
import { UserMapper } from '../mapper/user.mapper';
import { UserEntity } from '../entities/user.entity';
import { User } from '../domain/user';
import { UserSaveUser } from './port/out/user.saveUser';
import { UserLoadUser } from './port/out/user.loadUser';

@Injectable()
export class UserService implements UserRegisterUseCase {
  constructor(
    @Inject('UserSaveUser') private readonly userSaveUser: UserSaveUser,
    @Inject('UserLoadUser') private readonly userLoadUser: UserLoadUser,
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

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
