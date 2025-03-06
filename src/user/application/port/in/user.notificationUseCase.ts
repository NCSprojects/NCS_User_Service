export interface UserNotificationUseCase {
  getFcmToken(randomId: string): Promise<string>;
}
