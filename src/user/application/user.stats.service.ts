import { UserStatsUseCase } from './port/in/user.statsUseCase';
import { Inject } from '@nestjs/common';
import { UserLoadUser } from './port/out/user.loadUser';
import { getTodayRange } from '../../common/date';
import { UserDto } from '../dto/create-user.dto';
import { UserMapper } from '../mapper/user.mapper';

export class UserStatsService implements UserStatsUseCase {
  constructor(
    @Inject('UserLoadUser') private readonly userLoadUser: UserLoadUser,
    private readonly userMapper: UserMapper,
  ) {}

  async getTodayUsers(): Promise<UserDto[]> {
    const { startOfDay, endOfDay } = getTodayRange();
    // const startOfDay = new Date('2025-02-14 00:00:00');
    // const endOfDay = new Date('2025-02-14 23:59:59.999');
    const users = await this.userLoadUser.findByStartEndDate(
      startOfDay,
      endOfDay,
    );
    return this.userMapper.toDtofromEntities(users);
  }
}
