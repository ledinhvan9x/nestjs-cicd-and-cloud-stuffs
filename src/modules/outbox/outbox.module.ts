import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

import { OutboxEvent } from './outbox.entity';
import { OutboxService } from './outbox.service';
import { OutboxWorker } from './outbox.worker';

@Module({
  imports: [
    TypeOrmModule.forFeature([OutboxEvent]),

    BullModule.registerQueue({
      name: 'your-queue-name',
    }),
  ],

  providers: [
    OutboxService,
    OutboxWorker,
  ],

  exports: [
    OutboxService,
  ],
})
export class OutboxModule {}
