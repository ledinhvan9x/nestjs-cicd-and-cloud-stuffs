import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class TestQueueService {
  constructor(
    @InjectQueue('test-queue')
    private queue: Queue,
  ) {}

  async addJob(data: any) {
    return this.queue.add('test-job', data);
  }
}
