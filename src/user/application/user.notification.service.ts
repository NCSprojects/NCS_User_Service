import { UserNotificationUseCase } from './port/in/user.notificationUseCase';
import { UserFcmToken } from './port/out/user.fcmTokenPort';
import { Inject } from '@nestjs/common';

export class UserNotificationService implements UserNotificationUseCase {
  constructor(@Inject('FcmAdapter') private readonly fcmPort: UserFcmToken) {}

  async getFcmToken(randomId: string): Promise<string> {
    try {
      return await this.fcmPort.getFcmToken(randomId);
    } catch (error) {
      console.error(`Error fetching FCM token for ${randomId}:`, error);
      return error instanceof Error ? error.message : String(error);
    }
  }
}
