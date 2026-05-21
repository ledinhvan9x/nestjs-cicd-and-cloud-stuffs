import { Controller, Post } from '@nestjs/common';
import { TestQueueService } from './test.service';

@Controller('queue')
export class TestQueueController {
  constructor(private readonly service: TestQueueService) {}

  @Post()
  async test() {
    return this.service.addJob({
      message: 'hello bull',
    });
  }
}
