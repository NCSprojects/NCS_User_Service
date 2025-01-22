import { UserEntity } from 'src/user/entities/user.entity';
import { UserLoadUser } from '../../application/port/out/user.loadUser';
import { UserSaveUser } from '../../application/port/out/user.saveUser';
import { UserRepository } from './user.repository';
import { User } from '../../domain/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAdapter implements UserLoadUser, UserSaveUser {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(user: User): Promise<UserEntity> {
    return await this.usersRepository.createUser(user);
  }
  async findByRandomId(id: number): Promise<UserEntity> {
    return await this.usersRepository.findById(id);
  }
}
