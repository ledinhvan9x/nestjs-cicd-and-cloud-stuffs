import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { OutboxService } from './outbox.service';

@Injectable()
export class OutboxWorker {
  constructor(
    private readonly outboxService: OutboxService,

    @InjectQueue('your-queue-name')
    private readonly queue: Queue,
  ) {}

  async process() {
    const events = await this.outboxService.findPending();

    for (const event of events) {
      await this.queue.add(
        event.eventType,
        event.payload,
      );

      await this.outboxService.markProcessed(event.id);
    }
  }
}
