import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async sendFeedback(data: any): Promise<{ status: string }> {
    return {
      status: `Feedback received successfully`,
    };
  }
}
