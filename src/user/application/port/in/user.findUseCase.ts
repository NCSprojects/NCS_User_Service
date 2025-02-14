import { UserDto } from '../../../dto/create-user.dto';

export interface UserRegisterUseCase {
  saveUserInfo(userDto: UserDto): Promise<UserDto>;
  findByRandomIdUserInfo(randomId: string): Promise<UserDto>;
}
