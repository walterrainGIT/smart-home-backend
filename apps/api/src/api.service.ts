import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {

  constructor() {}

  async getLiveStatus(): Promise<string> {
    return 'LIVE';
  }
}
