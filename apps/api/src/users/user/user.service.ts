import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  /*private feedbackService: GrpcFeedbackService;

  constructor(@Inject('FEEDBACK_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.feedbackService = this.client.getService<GrpcFeedbackService>('UserService');
  }

  async processFeedback(feedbackData: ITestData): Promise<string> {
    const res = await firstValueFrom(this.feedbackService.sendFeedback(feedbackData));

    return res.status; // Возвращаем статус
  }*/
}
