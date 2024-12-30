import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly apiService: UserService) {}

  /*@Get()
  async getFeedback() {
    const feedbackData = 'This is feedback data';

    return this.apiService.processFeedback({ data: feedbackData });
  }*/
}
