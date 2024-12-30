import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const token = request.headers['authorization']?.replace('Bearer ', '');

        if (token) {
            request.cookies = { token }; // Устанавливаем куки для запросов
        }

        return next.handle();
    }
}
