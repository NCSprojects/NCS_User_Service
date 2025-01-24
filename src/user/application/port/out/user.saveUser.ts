import { UserEntity } from '../../../entities/user.entity';

export interface UserSaveUser {
  createUser(user: UserEntity): Promise<UserEntity>;
}
