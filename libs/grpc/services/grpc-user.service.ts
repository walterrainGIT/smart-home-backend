import { Observable } from 'rxjs';

export interface GrpcUserService {
  sendFeedback(data: any): Observable<{ status: string }>;
}
