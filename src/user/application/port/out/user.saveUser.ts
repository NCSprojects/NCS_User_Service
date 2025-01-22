import { UserEntity } from '../../../entities/user.entity';
import { User } from '../../../domain/user';

export interface UserSaveUser {
  createUser(user: User): Promise<UserEntity>;
}
