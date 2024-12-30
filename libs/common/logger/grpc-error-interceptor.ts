import {Injectable, CallHandler, ExecutionContext, NestInterceptor, HttpStatus} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {GrpcException, PinoLoggerService} from '@smart-home/libs/common/logger'; // Путь к вашему исключению

@Injectable()
export class GrpcErrorInterceptor implements NestInterceptor {
    constructor(private readonly logger: PinoLoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                this.logger.error('gRPC error: ', error);
                throw new GrpcException(error.details || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            })
        );
    }
}
