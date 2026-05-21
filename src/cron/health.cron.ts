import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class HealthCron {
  @Cron('*/10 * * * * *') // 10 secs
  handleCron() {
    console.log('🔁 Cron running every 10 seconds');
  }
}
