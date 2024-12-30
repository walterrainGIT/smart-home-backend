import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'SendUser')
  async sendFeedback(data: any): Promise<{ status: string }> {
    return this.userService.sendFeedback(data);
  }
}
