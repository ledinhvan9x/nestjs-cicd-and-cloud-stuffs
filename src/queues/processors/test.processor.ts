import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('test-queue')
export class TestProcessor {
  @Process('test-job')
  async handle(job: Job) {
    console.log('🔥 Job received:', job.data);

    return {
      success: true,
    };
  }
}
