export interface UserFcmToken {
  getFcmToken(randomId: string): Promise<string>;
  setFcmToken(randomId: string, token: string, expiry: number);
}
