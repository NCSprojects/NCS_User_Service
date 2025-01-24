import { Observable } from 'rxjs';

export interface AuthPort {
  validateUser(
    token: string,
  ): Observable<{ isValid: boolean; userId: string | null }>;
}
