import { HttpException, HttpStatus } from '@nestjs/common';

export class GrpcException extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status);
    }
}
