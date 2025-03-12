import { UserDto } from '../../../dto/create-user.dto';

export interface UserStatsUseCase {
  getTodayUsers(): Promise<UserDto[]>;
}
