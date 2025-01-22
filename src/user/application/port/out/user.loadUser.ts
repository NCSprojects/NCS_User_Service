import { UserEntity } from '../../../entities/user.entity';

export interface UserLoadUser {
  findByRandomId(id: number): Promise<UserEntity>;
}
