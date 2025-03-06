import { Injectable } from '@nestjs/common';
import { UserFcmToken } from '../../application/port/out/user.fcmTokenPort';
import { RedisRepository } from './user.redis.repository';

@Injectable()
export class UserFcmAdapter implements UserFcmToken {
  constructor(private readonly redisRepository: RedisRepository) {}

  getFcmToken(randomId: string): Promise<string> {
    return this.redisRepository.get(randomId);
  }
  setFcmToken(randomId: string, token: string, expiry: number) {
    return this.redisRepository.setEx(randomId, token, expiry);
  }
}
