import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { UserRegisterUseCase } from './port/in/user.findUseCase';
import { UserAdapter } from '../adapter/out.persistence/user.userAdapter';
import { UserMapper } from '../mapper/user.mapper';
import { UserEntity } from '../entities/user.entity';
import { User } from '../domain/user';

@Injectable()
export class UserService implements UserRegisterUseCase {
  constructor(
    private readonly userAdapter: UserAdapter,
    private readonly userMapper: UserMapper,
  ) {}

  async saveUserInfo(createUserDto: UserDto): Promise<UserDto> {
    const user: User = this.userMapper.toDomainfromDto(createUserDto);
    const requestUserEntity: UserEntity =
      this.userMapper.toEntityfromDomain(user);
    const userEntity: UserEntity =
      await this.userAdapter.createUser(requestUserEntity);
    console.log(userEntity);
    return this.userMapper.toDtofromEntity(userEntity);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByRandomIdUserInfo(id: number): Promise<UserDto> {
    const userEntity: UserEntity = await this.userAdapter.findByRandomId(id);
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
