import { Injectable, Catch, ArgumentsHost, HttpStatus, HttpException, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PinoLoggerService } from "@smart-home/libs/common/logger/pino-logger.service";
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';

@Injectable()
@Catch()
export class GrpcErrorInterceptor implements NestInterceptor {
    private readonly logger = new PinoLoggerService();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((exception) => {
                this.handleError(exception, context);
                throw exception;
            })
        );
    }

    private handleError(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        let request;

        try {
            request = ctx.getRequest();
        } catch (e) {
            request = null;
        }

        if (request && request.headers && request.headers['content-type']) {
            this.logger.error('HTTP error intercepted', exception);

            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: exception.details || exception.message || 'Internal Server Error',
                },
                HttpStatus.BAD_REQUEST,
            );
        } else {
            this.logger.error('gRPC error intercepted', exception);

            const rpcContext = host.switchToRpc();
            const data = rpcContext.getData();

            throw new RpcException({
                message: exception.details || exception.message || 'Internal Server Error',
                code: exception.code || HttpStatus.BAD_REQUEST,
                data: data,
            });
        }
    }
}
