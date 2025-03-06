import { UserDto } from '../../../dto/create-user.dto';
import { CreateFcmDto } from '../../../dto/create-fcm-dto';

export interface UserRegisterUseCase {
  saveUserInfo(userDto: UserDto): Promise<UserDto>;
  findByRandomIdUserInfo(randomId: string): Promise<UserDto>;
  saveUserFcmToken(fcmDto: CreateFcmDto): Promise<boolean>;
}
