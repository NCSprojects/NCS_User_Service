import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async findById(id: number): Promise<UserEntity | null> {
    return await this.findOne({ where: { id: id } });
  }
  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.save(user);
  }
}
