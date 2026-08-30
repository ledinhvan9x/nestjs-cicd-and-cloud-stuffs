import { Module } from '@nestjs/common';
import QueueProvider from './queue.provider';
import { BullModule } from '@nestjs/bull';
import { TestProcessor } from './processors/test.processor';
import { TestQueueController } from './test.cotroller';
import { TestQueueService } from './test.service';

@Module({
  imports: [
    QueueProvider,
    BullModule.registerQueue({
      name: 'test-queue',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
    },
  },
    }),
  ],
  controllers: [TestQueueController],
  providers: [TestProcessor, TestQueueService],
})
export class QueueModule {}
